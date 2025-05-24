import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { DataSource } from "@/types/dataSource";
import { SelectedOption } from "./dataSourceModal";

type DataSourceOption = {
  [key: string]: string[];
};

interface DataSourceListProps {
  dataSources: DataSource[];
  onListSelect: (element: SelectedOption | null) => void;
}

const DataSourceList = ({ dataSources, onListSelect }: DataSourceListProps) => {
  const [open, setOpen] = React.useState<Record<string, boolean>>({});

  const handleDataSourceClick = (dataSource: string) => {
    setOpen((prev) => ({ ...prev, [dataSource]: !prev[dataSource] }));
  };

  const handlePropertyClick = (dataSource: string, property: string) => {
    onListSelect({ source: dataSource, property });
  };

  const options: DataSourceOption = {};
  dataSources.forEach((dataSource) => {
    options[dataSource.name] = [];
    dataSource.properties.forEach((property) => {
      options[dataSource.name].push(property.name);
    });
  });

  return (
    <List>
      {Object.keys(options).map((dataSource) => (
        <React.Fragment key={dataSource}>
          <ListItemButton onClick={() => handleDataSourceClick(dataSource)}>
            <ListItemText primary={dataSource} />
            {open[dataSource] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          {options[dataSource].map((property) => {
            return (
              <Collapse
                in={!!open[dataSource]}
                timeout="auto"
                unmountOnExit
                key={`${dataSource}.${property}`}
              >
                <List component="div" disablePadding>
                  <ListItemButton
                    onClick={() => handlePropertyClick(dataSource, property)}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary={property} />
                  </ListItemButton>
                </List>
              </Collapse>
            );
          })}
        </React.Fragment>
      ))}
    </List>
  );
};

export default DataSourceList;
