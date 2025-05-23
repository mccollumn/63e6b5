import ListItem from "@/components/listItem";
import { BlueprintNode } from "@/types/blueprintGraph";

interface FormListItemProps {
  formNode: BlueprintNode;
  onClick: (formNode: BlueprintNode) => void;
}

const FormListItem = ({ formNode, onClick }: FormListItemProps) => {
  const { name } = formNode.data;

  return <ListItem onClick={() => onClick(formNode)}>{name}</ListItem>;
};

export default FormListItem;
