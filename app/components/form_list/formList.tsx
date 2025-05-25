import React from "react";
import { VertexDefinition, VertexBody } from "digraph-js";
import List from "@/components/list";
import FormListItem from "./formListItem";
import NotAvailable from "../notAvailable";
import { BlueprintContext } from "@/providers/blueprintProvider";
import { BlueprintNode } from "@/types/blueprintGraph";

interface FormListProps {
  handleFormClick: (formID: string) => void;
}

const FormList = ({ handleFormClick }: FormListProps) => {
  const [formList, setFormList] = React.useState<
    VertexDefinition<VertexBody>[]
  >([]);
  const { graph, isError } = React.useContext(BlueprintContext);

  React.useEffect(() => {
    if (graph) {
      const formNodes = graph
        .traverseEager()
        .filter(
          (vertex) =>
            (vertex.body as unknown as BlueprintNode).data?.component_type ===
            "form"
        );
      setFormList(formNodes);
    }
  }, [graph]);

  React.useEffect(() => {
    if (isError) {
      setFormList([]);
    }
  }, [isError]);

  return (
    <List>
      {formList.length === 0 && <NotAvailable>No forms available</NotAvailable>}
      {formList
        .sort((a, b) =>
          (a.body as unknown as BlueprintNode).data.name.localeCompare(
            (b.body as unknown as BlueprintNode).data.name
          )
        )
        .map((form) => (
          <FormListItem
            formNode={form.body as unknown as BlueprintNode}
            key={form.id}
            onClick={(formNode) => {
              handleFormClick(formNode.id);
            }}
          />
        ))}
    </List>
  );
};

export default FormList;
