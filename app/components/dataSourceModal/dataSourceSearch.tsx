import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { SelectedOption } from "./dataSourceModal";
import { DataSource } from "@/types/dataSource";

type DataSourceOption = {
  label: string;
  id: SelectedOption;
};

interface DataSourceSearchProps {
  dataSources: DataSource[];
  onSearchSelect: (element: SelectedOption | null) => void;
}

const DataSourceSearch = ({
  dataSources,
  onSearchSelect,
}: DataSourceSearchProps) => {
  const options: DataSourceOption[] = [];
  dataSources.forEach((dataSource) => {
    dataSource.properties.forEach((property) => {
      options.push({
        label: `${dataSource.name}.${property.name}`,
        id: { source: dataSource.name, property: property.name },
      });
    });
  });

  return (
    <Autocomplete
      options={options}
      renderInput={(params) => <TextField {...params} label="Search" />}
      onChange={(event, value) => {
        onSearchSelect(value ? value.id : null);
      }}
      sx={{ width: 300 }}
      autoComplete
      autoFocus
    />
  );
};

export default DataSourceSearch;
