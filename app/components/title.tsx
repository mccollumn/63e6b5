import { Typography } from "@mui/material";

interface TitleProps {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <Typography variant="h6" align="center" sx={{ padding: 2 }}>
      {children}
    </Typography>
  );
};

export default Title;
