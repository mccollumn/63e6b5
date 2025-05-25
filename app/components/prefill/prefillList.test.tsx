import { render, screen, fireEvent } from "@testing-library/react";
import PrefillList from "./prefillList";
import React from "react";

jest.mock("@/hooks/usePrefillMapping", () => () => ({
  formNodeName: "Test Form",
  prefillMapping: [
    { name: "foo", value: "bar" },
    { name: "baz", value: null },
  ],
  updatePrefillMapping: jest.fn(),
}));

jest.mock("@/hooks/useDataSources", () => () => ({
  dataSources: [
    {
      id: "1",
      name: "Source1",
      properties: [{ name: "propA", type: "string" }],
    },
  ],
}));

describe("PrefillList", () => {
  it("renders the form node name and all prefill mappings", () => {
    render(<PrefillList formNodeID="id1" />);
    expect(
      screen.getByText("Prefill Mapping for Test Form")
    ).toBeInTheDocument();
    expect(screen.getByText("foo: bar")).toBeInTheDocument();
    expect(screen.getByText("baz: null")).toBeInTheDocument();
  });

  it("shows NotAvailable if no prefill mappings", () => {
    jest.mock("@/hooks/usePrefillMapping", () => () => ({
      formNodeName: "Test Form",
      prefillMapping: [],
      updatePrefillMapping: jest.fn(),
    }));
    render(<PrefillList formNodeID="id1" />);
    expect(
      screen.getByText("No prefill mapping available")
    ).toBeInTheDocument();
  });

  it("opens and closes the DataSourceModal", () => {
    render(<PrefillList formNodeID="id1" />);
    fireEvent.click(screen.getByText("foo: bar"));
    expect(screen.getByText("Select data element to map")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cancel"));
    expect(
      screen.queryByText("Select data element to map")
    ).not.toBeInTheDocument();
  });
});
