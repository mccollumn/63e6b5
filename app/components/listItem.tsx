import { Paper, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

interface ListItemProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  onCancel?: () => void;
}

const ListItem = ({ children, onCancel, ...props }: ListItemProps) => {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: 2,
        marginBottom: 2,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
      }}
      {...props}
    >
      <Typography variant="body1">{children}</Typography>
      {onCancel ? (
        <CancelIcon
          onClick={(e) => {
            e.stopPropagation();
            onCancel();
          }}
        />
      ) : null}
    </Paper>
  );
};

export default ListItem;
