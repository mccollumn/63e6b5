import React from "react";
import List from "@/components/list";
import NotAvailable from "../notAvailable";
import Title from "../title";
import PrefillListItem from "./prefillListItem";
import DataSourceModal from "../dataSourceModal/dataSourceModal";
import usePrefillMapping from "@/hooks/useFormMapping";

interface PrefillListProps {
  formNodeID: string | null;
}

const PrefillList = ({ formNodeID }: PrefillListProps) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { formNodeName, prefillMapping, updatePrefillMapping } =
    usePrefillMapping(formNodeID);

  const handleClick = (formNodeID: string, name: string) => {
    console.log("Clicked", formNodeID, name);
    setIsModalOpen(true);
  };

  const handleClear = (formNodeID: string, name: string) => {
    console.log("clear", formNodeID, name);
    updatePrefillMapping(formNodeID, name);
  };

  const handleModalCancel = () => {
    console.log("Modal cancelled");
    setIsModalOpen(false);
  };

  const handleModalSelect = (element: string) => {
    console.log("Modal select", element);
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
        options={(prefillMapping ?? []).map((property) => property.name)}
        onCancel={handleModalCancel}
        onSelect={handleModalSelect}
      />
      ;
    </>
  );
};

export default PrefillList;
