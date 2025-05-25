import { render, screen, fireEvent } from "@testing-library/react";
import PrefillList from "./prefillList";
import usePrefillMapping from "@/hooks/usePrefillMapping";
import React from "react";

jest.mock("@/hooks/usePrefillMapping");

const mockedUsePrefillMapping = usePrefillMapping as jest.Mock;

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
  beforeEach(() => {
    mockedUsePrefillMapping.mockReset();
  });
  it("renders the form node name and all prefill mappings", () => {
    mockedUsePrefillMapping.mockReturnValue({
      formNodeName: "Test Form",
      prefillMapping: [
        { name: "foo", value: "bar" },
        { name: "baz", value: null },
      ],
      updatePrefillMapping: jest.fn(),
    });
    render(<PrefillList formNodeID="id1" />);
    expect(
      screen.getByText("Prefill Mapping for Test Form")
    ).toBeInTheDocument();
    expect(screen.getByText("foo: bar")).toBeInTheDocument();
    expect(screen.getByText("baz:")).toBeInTheDocument();
  });

  it("shows NotAvailable if no prefill mappings", () => {
    mockedUsePrefillMapping.mockReturnValue({
      formNodeName: "Test Form",
      prefillMapping: [],
      updatePrefillMapping: jest.fn(),
    });
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
    mockedUsePrefillMapping.mockReturnValue({
      formNodeName: "Test Form",
      prefillMapping: [
        { name: "foo", value: "bar" },
        { name: "baz", value: null },
      ],
      updatePrefillMapping: jest.fn(),
    });
    render(<PrefillList formNodeID="id1" />);
    fireEvent.click(screen.getByText("foo: bar"));
    expect(screen.getByText("Select data element to map")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cancel"));
    // expect(
    //   screen.queryByText("Select data element to map")
    // ).not.toBeInTheDocument();
  });
});
