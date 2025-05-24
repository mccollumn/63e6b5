import React from "react";
import { Box } from "@mui/material";
import { BlueprintContext } from "@/providers/blueprintProvider";
import TextInput from "./textInput";
import SubmitButton from "./submitButton";

interface GetFormsProps {
  handleAccordionChange: () => void;
}

const GetForms = ({ handleAccordionChange }: GetFormsProps) => {
  const [server, setServer] = React.useState(
    process.env.NEXT_PUBLIC_API_SERVER || ""
  );
  const [tenantId, setTenantId] = React.useState(
    process.env.NEXT_PUBLIC_API_TENANT_ID || ""
  );
  const [blueprintId, setBlueprintId] = React.useState(
    process.env.NEXT_PUBLIC_API_BLUEPRINT_ID || ""
  );
  const [blueprintVersionId, setBlueprintVersionId] = React.useState("");
  const { setRequestOptions } = React.useContext(BlueprintContext);

  const handleSubmit = () => {
    const requestOptions = {
      server,
      tenantID: tenantId,
      blueprintID: blueprintId,
      blueprintVersionID: blueprintVersionId,
    };
    setRequestOptions(requestOptions);
    handleAccordionChange();
  };

  const formInputConfigs = [
    {
      label: "Server",
      value: server,
      placeholder: "http://localhost:3001",
      onchange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setServer(e.target.value),
      required: true,
    },
    {
      label: "Tenant ID",
      value: tenantId,
      placeholder: "1",
      onchange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setTenantId(e.target.value),
      required: true,
    },
    {
      label: "Blueprint ID",
      value: blueprintId,
      placeholder: "bp_01jk766tckfwx84xjcxazggzyc",
      onchange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setBlueprintId(e.target.value),
      required: true,
    },
    {
      label: "Blueprint Version ID",
      value: blueprintVersionId,
      placeholder: "bpv_123",
      onchange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setBlueprintVersionId(e.target.value),
    },
  ];

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "25%",
        minWidth: "200px",
        justifySelf: "center",
      }}
    >
      {formInputConfigs.map((input) => (
        <TextInput
          key={input.label}
          label={input.label}
          value={input.value}
          placeholder={input.placeholder}
          onChange={input.onchange}
          required={input.required}
        />
      ))}
      <SubmitButton onSubmit={handleSubmit}>Get Forms</SubmitButton>
    </Box>
  );
};

export default GetForms;
