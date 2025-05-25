"use client";

import React from "react";
import { DiGraph, VertexDefinition, VertexBody } from "digraph-js";
import { BlueprintGraph } from "../types/blueprintGraph";
import { getData } from "../util/getData";

type RequestOptions = {
  server: string | null;
  tenantID: string | null;
  blueprintID: string | null;
};

/**
 * Context type for providing blueprint-related data and state throughout the application.
 *
 * @property {BlueprintGraph | null} data - The current blueprint graph data, or null if not loaded.
 * @property {DiGraph<VertexDefinition<VertexBody>> | null} graph - The directed graph representation of the blueprint, or null if not available.
 * @property {RequestOptions} requestOptions - The current options used for requests related to the blueprint.
 * @property {React.Dispatch<React.SetStateAction<RequestOptions>>} setRequestOptions - Function to update the request options.
 * @property {boolean} isLoading - Indicates whether blueprint data is currently being loaded.
 * @property {boolean} [isError] - Optional flag indicating if there was an error loading the blueprint data.
 */
interface BlueprintContextType {
  data: BlueprintGraph | null;
  graph: DiGraph<VertexDefinition<VertexBody>> | null;
  requestOptions: RequestOptions;
  setRequestOptions: React.Dispatch<React.SetStateAction<RequestOptions>>;
  isLoading: boolean;
  isError?: boolean;
}

const defaultRequestOptions: RequestOptions = {
  server: null,
  tenantID: null,
  blueprintID: null,
};

const BlueprintContext = React.createContext<BlueprintContextType>({
  data: null,
  graph: null,
  requestOptions: defaultRequestOptions,
  setRequestOptions: () => {},
  isLoading: false,
  isError: false,
});

const BlueprintProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = React.useState<BlueprintGraph | null>(null);
  const [graph, setGraph] = React.useState<DiGraph<
    VertexDefinition<VertexBody>
  > | null>(null);
  const [requestOptions, setRequestOptions] = React.useState<RequestOptions>(
    defaultRequestOptions
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const { server, tenantID, blueprintID } = requestOptions;

  React.useEffect(() => {
    const retrieveData = async () => {
      if (!server || !tenantID || !blueprintID) return;
      setIsLoading(true);
      setIsError(false);
      try {
        const blueprintData = await getData(server, tenantID, blueprintID);
        if (!blueprintData || blueprintData.error) {
          console.error(
            "Error retrieving blueprint data:",
            blueprintData?.error
          );
          setData(null);
          setIsError(true);
        } else {
          setData(blueprintData);
        }
      } catch {
        console.error("Error fetching blueprint data");
        setData(null);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    retrieveData();
  }, [server, tenantID, blueprintID]);

  React.useEffect(() => {
    if (data) {
      setGraph(createGraph(data));
    }
  }, [data]);

  return (
    <BlueprintContext.Provider
      value={{
        data,
        graph,
        requestOptions,
        setRequestOptions,
        isLoading,
        isError,
      }}
    >
      {children}
    </BlueprintContext.Provider>
  );
};

/**
 * Creates a directed graph (DiGraph) from the provided blueprint data.
 *
 * @param data - The blueprint graph data containing nodes and edges.
 * @returns A DiGraph instance representing the blueprint, or `null` if nodes or edges are missing.
 */
const createGraph = (data: BlueprintGraph) => {
  const graph = new DiGraph();
  const nodes = data.nodes;
  const edges = data.edges;

  if (!nodes || !edges) return null;

  nodes.forEach((node) => {
    const { id } = node;
    graph.addVertex({ id, adjacentTo: [], body: { ...node } });
  });

  edges.forEach((edge) => {
    const { source, target } = edge;
    graph.addEdge({ from: source, to: target });
  });

  return graph;
};

export { BlueprintProvider, BlueprintContext };
