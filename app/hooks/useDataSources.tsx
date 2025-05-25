import React from "react";
import { BlueprintContext } from "@/providers/blueprintProvider";
import getFormFromNodeID from "@/util/getFormFromNodeID";
import createFormMapping from "@/util/createFormMapping";
import { getDataSources } from "@/util/getDataSources";
import { BlueprintForm } from "@/types/blueprintGraph";
import { DataSource } from "@/types/dataSource";

const useDataSources = (formNodeID: string | null) => {
  const [dataSources, setDataSources] = React.useState<DataSource[]>([]);
  const [customDataSources, setCustomDataSources] = React.useState<
    DataSource[]
  >([]);
  const { data, graph } = React.useContext(BlueprintContext);

  React.useEffect(() => {
    const getCustomDataSources = async () => {
      const customDataSources: DataSource[] = await getDataSources();
      return customDataSources;
    };
    getCustomDataSources().then((customDataSources) => {
      if (Array.isArray(customDataSources)) {
        setCustomDataSources((prev) => [...prev, ...customDataSources]);
      } else if (customDataSources) {
        setCustomDataSources((prev) => [...prev, customDataSources]);
      }
    });
  }, []);

  React.useEffect(() => {
    if (!formNodeID || !graph || !data) return;

    const formDependencies = graph.getDeepParents(formNodeID).toArray();
    const forms = formDependencies.map((node) => getFormFromNodeID(node, data));
    const formNodes = formDependencies.map((node) =>
      data.nodes.find((n) => n.id === node)
    );
    setDataSources(customDataSources);

    forms.forEach((form, index) => {
      const formNodeName = formNodes[index]?.data.name ?? "";
      const formNodeID = formNodes[index]?.id ?? "";
      const mapping = createFormMapping(form as BlueprintForm);
      setDataSources((prev) => [
        ...prev,
        { name: formNodeName, id: formNodeID, properties: [...mapping] },
      ]);
    });
  }, [customDataSources, data, formNodeID, graph]);

  return {
    dataSources,
  };
};

export default useDataSources;
