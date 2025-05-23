import { Paper, Typography } from "@mui/material";

interface ListItemProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

const ListItem = ({ children, ...props }: ListItemProps) => {
  return (
    <Paper
      sx={{
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
    </Paper>
  );
};

export default ListItem;
