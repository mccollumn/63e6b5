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
import PrefillList from "./components/prefill/prefillList";

export default function Home() {
  const [expanded, setExpanded] = React.useState<string | false>("get-forms");
  const [selectedFormID, setSelectedFormID] = React.useState<string | null>(
    null
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const accordionPanelConfigs = [
    {
      id: "get-forms",
      title: "Enter Blueprint Details",
      content: (
        <GetForms
          handleAccordionChange={() => {
            setExpanded("list-forms");
          }}
        />
      ),
    },
    {
      id: "list-forms",
      title: "Forms",
      content: (
        <FormList
          handleFormClick={(formID) => {
            setSelectedFormID(formID);
            setExpanded("prefill");
          }}
        />
      ),
    },
    {
      id: "prefill",
      title: "Prefill",
      content: <PrefillList formNodeID={selectedFormID} />,
    },
  ];

  return (
    <Box sx={{ width: "100%", padding: 4, justifySelf: "center" }}>
      {accordionPanelConfigs.map((panel) => (
        <Accordion
          key={panel.id}
          expanded={expanded === panel.id}
          onChange={handleChange(panel.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${panel.id}-content`}
            id={`${panel.id}-header`}
          >
            <Typography align="center" sx={{ width: "100%" }}>
              {panel.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>{panel.content}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
