import ListItem from "@/components/listItem";
import { BlueprintNodeData } from "@/types/blueprintGraph";

interface FormListItemProps {
  form: BlueprintNodeData;
  onClick: (form: BlueprintNodeData) => void;
}

const FormListItem = ({ form, onClick }: FormListItemProps) => {
  const { name } = form;

  return <ListItem onClick={() => onClick(form)}>{name}</ListItem>;
};

export default FormListItem;
