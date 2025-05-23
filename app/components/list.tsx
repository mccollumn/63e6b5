import { Box, Stack } from "@mui/material";

interface ListProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

const List = ({ children, ...props }: ListProps) => {
  return (
    <Box
      sx={{
        padding: 2,
        width: "25%",
        minWidth: "200px",
        justifySelf: "center",
      }}
      {...props}
    >
      <Stack spacing={2}>{children}</Stack>
    </Box>
  );
};

export default List;
