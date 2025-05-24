import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import DataSourceSearch from "./dataSourceSearch";
import DataSourceList from "./dataSourceList";
import { DataSource } from "@/types/dataSource";

interface DataSourceModalProps {
  open: boolean;
  dataSources: DataSource[];
  onCancel: () => void;
  onSelect: (element: SelectedOption | null) => void;
}

export type SelectedOption = {
  source: string;
  property: string;
};

const DataSourceModal = ({
  open,
  dataSources,
  onCancel,
  onSelect,
}: DataSourceModalProps) => {
  const [selection, setSelection] = React.useState<SelectedOption | null>(null);

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Select data element to map</DialogTitle>
        <DialogContent>
          <DialogContentText>Available data</DialogContentText>
          <DataSourceSearch
            dataSources={dataSources}
            onSearchSelect={(element) => {
              setSelection(element);
            }}
          />
          <DataSourceList
            dataSources={dataSources}
            onListSelect={(element) => {
              setSelection(element);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onCancel();
              setSelection(null);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSelect(selection);
              setSelection(null);
            }}
            color="primary"
            disabled={!selection}
          >
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataSourceModal;
