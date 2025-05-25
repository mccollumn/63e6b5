import { render, screen, fireEvent } from "@testing-library/react";
import DataSourceSearch from "./dataSourceSearch";
import React from "react";

describe("DataSourceSearch", () => {
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

  it("renders first options source in the autocomplete", () => {
    render(
      <DataSourceSearch dataSources={dataSources} onSearchSelect={() => {}} />
    );
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    // Open the autocomplete dropdown
    fireEvent.focus(screen.getByLabelText("Search"));
    fireEvent.change(screen.getByLabelText("Search"), {
      target: { value: "Source1" },
    });
    expect(screen.getByText("Source1.propA")).toBeInTheDocument();
    expect(screen.getByText("Source1.propB")).toBeInTheDocument();
  });

  it("renders second options source in the autocomplete", () => {
    render(
      <DataSourceSearch dataSources={dataSources} onSearchSelect={() => {}} />
    );
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    // Open the autocomplete dropdown
    fireEvent.focus(screen.getByLabelText("Search"));
    fireEvent.change(screen.getByLabelText("Search"), {
      target: { value: "Source2" },
    });
    expect(screen.getByText("Source2.propC")).toBeInTheDocument();
  });
});
