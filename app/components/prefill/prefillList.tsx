import React from "react";
import List from "@/components/list";
import NotAvailable from "../notAvailable";
import Title from "../title";
import { PrefillMappingContext } from "@/providers/prefillMappingProvider";
import { BlueprintContext } from "@/providers/blueprintProvider";
import convertFormToDataSource from "@/util/convertFormToDataSource";
import { BlueprintForm, BlueprintGraph } from "@/types/blueprintGraph";
import { PrefillMapping } from "@/types/dataSource";
import PrefillListItem from "./prefillListItem";

interface PrefillListProps {
  formNodeID: string | null;
  handleAccordionChange: () => void;
}

const PrefillList = ({
  formNodeID,
  handleAccordionChange,
}: PrefillListProps) => {
  const { setGlobalPrefillMapping } = React.useContext(PrefillMappingContext);
  const { data } = React.useContext(BlueprintContext);
  const [prefillMapping, setPrefillMapping] = React.useState<PrefillMapping[]>(
    []
  );
  const formNodeName =
    data?.nodes.find((node) => node.id === formNodeID)?.data.name ?? "";

  React.useEffect(() => {
    if (!formNodeID || !data) return;
    const form = getFormFromNodeID(formNodeID, data);

    if (!form) return;
    const formMapping = createFormMapping(form);
    setPrefillMapping(formMapping);
    setGlobalPrefillMapping((prev) => [
      ...prev,
      { id: formNodeID, name: formNodeName, properties: formMapping },
    ]);

    handleAccordionChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, formNodeID]);

  const handleClick = (formNodeID: string, name: string) => {
    console.log("Clicked", formNodeID, name);
  };

  const handleClear = (formNodeID: string, name: string) => {
    console.log("clear", formNodeID, name);
    setPrefillMapping((prev) =>
      prev.map((property) => {
        if (property.name === name) {
          return { ...property, value: null };
        }
        return property;
      })
    );
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

  return (
    <>
      <Title>Prefill Mapping for {formNodeName}</Title>
      <List>
        {prefillMapping.length === 0 && (
          <NotAvailable>No prefill mapping available</NotAvailable>
        )}
        {prefillMapping.map((property) => {
          return (
            <PrefillListItem
              key={property.name}
              name={property.name}
              value={property.value}
              formNodeID={formNodeID}
              onClick={handleClick}
              onClear={handleClear}
            >
              {property.name}: {property.value}
            </PrefillListItem>
          );
        })}
      </List>
    </>
  );
};

const getFormFromNodeID = (formNodeID: string, data: BlueprintGraph) => {
  const formNode = data.nodes.find((node) => node.id === formNodeID);
  if (!formNode) return null;
  const formID = formNode.data.component_id;
  const form = data.forms.find((form) => form.id === formID) as BlueprintForm;

  return form;
};

const createFormMapping = (form: BlueprintForm) => {
  const dataSource = convertFormToDataSource(form);
  return dataSource.properties.map((property) => {
    return { value: null, ...property };
  });
};

export default PrefillList;
