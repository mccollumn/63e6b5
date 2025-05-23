import { Paper, Typography } from "@mui/material";
import { BlueprintNodeData } from "@/types/blueprintGraph";

interface ListFileItemProps {
  form: BlueprintNodeData;
  onClick: (form: BlueprintNodeData) => void;
}

const ListFileItem = ({ form, onClick }: ListFileItemProps) => {
  const { name } = form;

  return (
    <Paper
      onClick={() => onClick(form)}
      sx={{
        padding: 2,
        marginBottom: 2,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      <Typography variant="body1">{name}</Typography>
    </Paper>
  );
};

export default ListFileItem;
