import ListItem from "@/components/listItem";

interface PrefillListItemProps {
  children: React.ReactNode;
  name: string;
  value?: string | null;
  formNodeID: string | null;
  onClick: (formNodeID: string, name: string) => void;
  onClear: (formNodeID: string, name: string) => void;
}

const PrefillListItem = ({
  children,
  name,
  value,
  formNodeID,
  onClick,
  onClear,
}: PrefillListItemProps) => {
  if (!formNodeID) return null;

  return (
    <ListItem
      onClick={() => onClick(formNodeID, name)}
      {...(value ? { onCancel: () => onClear(formNodeID, name) } : {})}
    >
      <span style={{ color: !value ? "gray" : undefined }}>{children}</span>
    </ListItem>
  );
};

export default PrefillListItem;
