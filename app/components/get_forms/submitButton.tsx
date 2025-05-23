import React from "react";
import { Button } from "@mui/material";
import { BlueprintContext } from "@/providers/blueprintProvider";

interface SubmitButtonProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

const SubmitButton = ({ children, onSubmit }: SubmitButtonProps) => {
  const { isLoading } = React.useContext(BlueprintContext);

  return (
    <Button
      type="submit"
      variant="contained"
      onClick={onSubmit}
      loading={isLoading}
      sx={{ width: "50%", alignSelf: "center" }}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
