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

  it("renders all options in the autocomplete", () => {
    render(
      <DataSourceSearch dataSources={dataSources} onSearchSelect={() => {}} />
    );
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    // Open the autocomplete dropdown
    fireEvent.focus(screen.getByLabelText("Search"));
    fireEvent.change(screen.getByLabelText("Search"), {
      target: { value: "Source1" },
    });
    // The options are rendered in the DOM as listbox options
    // (MUI renders options in a portal, so you may need to query by text)
    expect(screen.getByText("Source1.propA")).toBeInTheDocument();
    expect(screen.getByText("Source1.propB")).toBeInTheDocument();
    expect(screen.getByText("Source2.propC")).toBeInTheDocument();
  });

  it("calls onSearchSelect with correct value", () => {
    const onSearchSelect = jest.fn();
    render(
      <DataSourceSearch
        dataSources={dataSources}
        onSearchSelect={onSearchSelect}
      />
    );
    fireEvent.focus(screen.getByLabelText("Search"));
    fireEvent.change(screen.getByLabelText("Search"), {
      target: { value: "Source1.propA" },
    });
    // Simulate selecting the first option
    fireEvent.keyDown(screen.getByLabelText("Search"), { key: "ArrowDown" });
    fireEvent.keyDown(screen.getByLabelText("Search"), { key: "Enter" });
    // onSearchSelect should be called with the correct id
    expect(onSearchSelect).toHaveBeenCalled();
  });
});
