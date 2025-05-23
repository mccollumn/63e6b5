import { Typography } from "@mui/material";

interface NotAvailableProps {
  children: React.ReactNode;
}

const NotAvailable = ({ children }: NotAvailableProps) => {
  return (
    <Typography
      variant="body1"
      color="warning"
      align="center"
      sx={{ padding: 2 }}
    >
      {children}
    </Typography>
  );
};

export default NotAvailable;
