import ListItem from "@/components/listItem";

/**
 * Props for the PrefillListItem component.
 *
 * @property {React.ReactNode} children - The content to be rendered inside the list item.
 * @property {string} name - The name associated with the prefill item.
 * @property {string | null} [value] - The value to display for the prefill item, or null if not set.
 * @property {string | null} formNodeID - The unique identifier for the form node, or null if not available.
 * @property {(formNodeID: string, name: string) => void} onClick - Callback invoked when the item is clicked, receiving the form node ID and name.
 * @property {(formNodeID: string, name: string) => void} onClear - Callback invoked when the clear action is triggered, receiving the form node ID and name.
 */
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
