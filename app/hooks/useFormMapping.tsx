import React from "react";
import convertFormToDataSource from "@/util/convertFormToDataSource";
import { BlueprintContext } from "@/providers/blueprintProvider";
import { BlueprintForm, BlueprintGraph } from "@/types/blueprintGraph";
import { PrefillMapping } from "@/types/dataSource";
import { PrefillMappingContext } from "@/providers/prefillMappingProvider";

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

  const updatePrefillMapping = (formNodeID: string, name: string) => {
    if (setPrefillMapping) {
      setPrefillMapping((prev) =>
        prev.map((property) => {
          if (property.name === name) {
            return { ...property, value: null };
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
                return { ...property, value: null };
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

const getFormFromNodeID = (formNodeID: string, data: BlueprintGraph) => {
  const formNode = data.nodes.find((node) => node.id === formNodeID);
  if (!formNode) return null;
  const formID = formNode.data.component_id;
  const form = data.forms.find((form) => form.id === formID) as BlueprintForm;

  return form;
};

const createFormMapping = (form: BlueprintForm): PrefillMapping[] => {
  const dataSource = convertFormToDataSource(form);
  return dataSource.properties.map((property) => {
    return { value: null, ...property };
  });
};

export default usePrefillMapping;
