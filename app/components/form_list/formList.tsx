import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { VertexDefinition, VertexBody } from "digraph-js";
import FormListItem from "./formListItem";
import { BlueprintContext } from "@/providers/blueprintProvider";
import { BlueprintNodeData } from "@/types/blueprintGraph";

const FormList = () => {
  const [formList, setFormList] = React.useState<
    VertexDefinition<VertexBody>[]
  >([]);
  const { graph } = React.useContext(BlueprintContext);

  React.useEffect(() => {
    if (graph) {
      const forms = graph
        .traverseEager()
        .filter((vertex) => vertex.body.component_type === "form");
      setFormList(forms);
    }
  }, [graph]);

  console.log("FormList", formList);

  return (
    <Box
      sx={{
        padding: 2,
        width: "25%",
        minWidth: "200px",
        justifySelf: "center",
      }}
    >
      <Stack spacing={2}>
        {formList.length === 0 && (
          <Typography
            variant="body1"
            color="warning"
            align="center"
            sx={{ padding: 2 }}
          >
            No forms available
          </Typography>
        )}
        {formList
          .sort((a, b) =>
            (a.body as unknown as BlueprintNodeData).name.localeCompare(
              (b.body as unknown as BlueprintNodeData).name
            )
          )
          .map((form) => (
            <FormListItem
              form={form.body as unknown as BlueprintNodeData}
              key={form.id}
              onClick={() => {}}
            />
          ))}
      </Stack>
    </Box>
  );
};

export default FormList;
