import React from "react";
import { PrefillMappingContext } from "@/providers/prefillMappingProvider";
import { BlueprintContext } from "@/providers/blueprintProvider";
import getFormFromNodeID from "@/util/getFormFromNodeID";
import { PrefillMapping } from "@/types/dataSource";
import createFormMapping from "@/util/createFormMapping";

const usePrefillMapping = (formNodeID: string | null) => {
  const { data } = React.useContext(BlueprintContext);
  const { globalPrefillMapping, setGlobalPrefillMapping } = React.useContext(
    PrefillMappingContext
  );
  const [prefillMapping, setPrefillMapping] = React.useState<PrefillMapping[]>(
    []
  );
  const formNodeName =
    data?.nodes.find((node) => node.id === formNodeID)?.data.name ?? "";
  const form = formNodeID && data ? getFormFromNodeID(formNodeID, data) : null;

  React.useEffect(() => {
    if (!formNodeID || !formNodeName) return;
    setGlobalPrefillMapping((prev) => [
      ...prev.filter((mapping) => mapping.id !== formNodeID),
      {
        id: formNodeID,
        name: formNodeName,
        properties: prefillMapping ?? [],
      },
    ]);
  }, [formNodeID, formNodeName, prefillMapping, setGlobalPrefillMapping]);

  React.useEffect(() => {
    if (!form) return;
    const existingMapping = globalPrefillMapping.find(
      (mapping) => mapping.id === formNodeID
    );
    if (existingMapping) {
      setPrefillMapping(existingMapping?.properties ?? []);
      return;
    }
    const formMapping = createFormMapping(form);
    setPrefillMapping(formMapping);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, formNodeID]);

  const updatePrefillMapping = (
    formNodeID: string,
    name: string,
    value: string | null
  ) => {
    if (setPrefillMapping) {
      setPrefillMapping((prev) =>
        prev.map((property) => {
          if (property.name === name) {
            return { ...property, value: value };
          }
          return property;
        })
      );
    }
    setGlobalPrefillMapping((prev) =>
      prev.map((mapping) => {
        if (mapping.id === formNodeID) {
          return {
            ...mapping,
            properties: mapping.properties.map((property) => {
              if (property.name === name) {
                return { ...property, value: value };
              }
              return property;
            }),
          };
        }
        return mapping;
      })
    );
  };

  console.log("Prefill Mapping:", prefillMapping);
  console.log("Global Prefill Mapping:", globalPrefillMapping);

  return {
    form,
    formNodeName,
    prefillMapping,
    updatePrefillMapping,
  };
};

export default usePrefillMapping;
