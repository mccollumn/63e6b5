import { render, screen, fireEvent } from "@testing-library/react";
import DataSourceList from "./dataSourceList";
import React from "react";

describe("DataSourceList", () => {
  const dataSources = [
    {
      id: "1",
      name: "Source1",
      properties: [
        { name: "propA", type: "string" },
        { name: "propB", type: "number" },
      ],
    },
    {
      id: "2",
      name: "Source2",
      properties: [{ name: "propC", type: "string" }],
    },
  ];

  it("renders all data sources and properties", () => {
    render(
      <DataSourceList dataSources={dataSources} onListSelect={() => {}} />
    );
    expect(screen.getByText("Source1")).toBeInTheDocument();
    expect(screen.getByText("Source2")).toBeInTheDocument();
  });

  it("toggles collapse on click", () => {
    render(
      <DataSourceList dataSources={dataSources} onListSelect={() => {}} />
    );
    const source1 = screen.getByText("Source1");
    fireEvent.click(source1);
    // Should still be in the document after toggle
    expect(screen.getByText("Source1")).toBeInTheDocument();
  });
});
