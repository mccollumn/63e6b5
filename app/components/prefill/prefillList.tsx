import React from "react";
import List from "@/components/list";
import NotAvailable from "../notAvailable";
import Title from "../title";
import PrefillListItem from "./prefillListItem";
import DataSourceModal, {
  SelectedOption,
} from "../dataSourceModal/dataSourceModal";
import usePrefillMapping from "@/hooks/usePrefillMapping";
import useDataSources from "@/hooks/useDataSources";

interface PrefillListProps {
  formNodeID: string | null;
}

const PrefillList = ({ formNodeID }: PrefillListProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedElement, setSelectedElement] =
    React.useState<SelectedOption | null>(null);
  const { formNodeName, prefillMapping, updatePrefillMapping } =
    usePrefillMapping(formNodeID);
  const { dataSources } = useDataSources(formNodeID);

  const handleClick = (formNodeID: string, name: string) => {
    setSelectedElement({ source: formNodeID, property: name });
    setIsModalOpen(true);
  };

  const handleClear = (formNodeID: string, name: string) => {
    updatePrefillMapping(formNodeID, name, null);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalSelect = (value: string) => {
    updatePrefillMapping(
      selectedElement?.source || "",
      selectedElement?.property || "",
      value
    );
    setIsModalOpen(false);
  };

  return (
    <>
      <Title>Prefill Mapping for {formNodeName}</Title>
      <List>
        {(prefillMapping?.length ?? 0) === 0 && (
          <NotAvailable>No prefill mapping available</NotAvailable>
        )}
        {(prefillMapping ?? []).map((property) => {
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
      <DataSourceModal
        open={isModalOpen}
        dataSources={dataSources}
        onCancel={handleModalCancel}
        onSelect={(element) =>
          handleModalSelect(`${element?.source}.${element?.property}` || "")
        }
      />
    </>
  );
};

export default PrefillList;
