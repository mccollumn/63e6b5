"use client";

import React from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GetForms from "./components/get_forms/getForms";
import FormList from "./components/form_list/formList";

export default function Home() {
  const [expanded, setExpanded] = React.useState<string | false>("get-forms");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box sx={{ width: "100%", padding: 4, justifySelf: "center" }}>
      <Accordion
        expanded={expanded === "get-forms"}
        onChange={handleChange("get-forms")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="get-forms-content"
          id="get-forms-header"
        >
          <Typography align="center" sx={{ width: "100%" }}>
            Enter Blueprint Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <GetForms
            handleAccordionChange={() => {
              setExpanded("list-forms");
            }}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "list-forms"}
        onChange={handleChange("list-forms")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="list-forms-content"
          id="list-forms-header"
        >
          <Typography align="center" sx={{ width: "100%" }}>
            Forms
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormList />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
