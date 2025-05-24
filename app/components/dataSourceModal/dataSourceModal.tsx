import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { Autocomplete, TextField } from "@mui/material";

interface DataSourceModalProps {
  open: boolean;
  options: string[];
  onCancel: () => void;
  onSelect: (element: string) => void;
}

const DataSourceModal = ({
  open,
  options,
  onCancel,
  onSelect,
}: DataSourceModalProps) => {
  const handleClose = () => {
    //   setOpen(false);
  };

  const element = "exampleElement"; // Replace with actual element logic

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select data element to map</DialogTitle>
        <DialogContent>
          <DialogContentText>Available data</DialogContentText>
          <Autocomplete
            options={options}
            renderInput={(params) => <TextField {...params} label="Search" />}
            // onChange={(event, value) => {
            //   if (value) {
            //     onSelect(value);
            //   }
            // }}
            sx={{ width: 300 }}
            autoComplete
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={() => onSelect(element)} color="primary">
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataSourceModal;
