import React from "react";
import { PrefillMappingContext } from "@/providers/prefillMappingProvider";
import { BlueprintContext } from "@/providers/blueprintProvider";
import getFormFromNodeID from "@/util/getFormFromNodeID";
import { GlobalPrefillMapping, PrefillMapping } from "@/types/dataSource";
import createFormMapping from "@/util/createFormMapping";

const usePrefillMapping = (formNodeID: string | null) => {
  const { data } = React.useContext(BlueprintContext);
  const { globalPrefillMapping, setGlobalPrefillMapping } = React.useContext(
    PrefillMappingContext
  );
  const [prefillMapping, setPrefillMapping] = React.useState<PrefillMapping[]>(
    []
  );
  let formNodeName =
    data?.nodes?.find((node) => node.id === formNodeID)?.data.name ?? "";
  let form = formNodeID && data ? getFormFromNodeID(formNodeID, data) : null;

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
    updateFormMapping({ name, value, setPrefillMapping });
    updateGlobalMapping({ formNodeID, name, value, setGlobalPrefillMapping });
  };

  const clearPrefillMapping = () => {
    setPrefillMapping([]);
    setGlobalPrefillMapping([]);
    form = null;
    formNodeName = "";
  };

  return {
    form,
    formNodeName,
    prefillMapping,
    updatePrefillMapping,
    clearPrefillMapping,
  };
};

interface UpdateFormMappingParams {
  name: string;
  value: string | null;
  setPrefillMapping: React.Dispatch<React.SetStateAction<PrefillMapping[]>>;
}

const updateFormMapping = ({
  name,
  value,
  setPrefillMapping,
}: UpdateFormMappingParams): void => {
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
};

interface UpdateGlobalMappingParams {
  formNodeID: string;
  name: string;
  value: string | null;
  setGlobalPrefillMapping: React.Dispatch<
    React.SetStateAction<GlobalPrefillMapping[]>
  >;
}

const updateGlobalMapping = ({
  formNodeID,
  name,
  value,
  setGlobalPrefillMapping,
}: UpdateGlobalMappingParams) => {
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

export default usePrefillMapping;
