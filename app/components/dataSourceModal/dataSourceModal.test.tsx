import { render, screen, fireEvent } from "@testing-library/react";
import DataSourceModal from "./dataSourceModal";
import React from "react";

describe("DataSourceModal", () => {
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

  it("renders modal and options", () => {
    render(
      <DataSourceModal
        open={true}
        dataSources={dataSources}
        onCancel={() => {}}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText("Select data element to map")).toBeInTheDocument();
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });

  it("calls onCancel when Cancel is clicked", () => {
    const onCancel = jest.fn();
    render(
      <DataSourceModal
        open={true}
        dataSources={dataSources}
        onCancel={onCancel}
        onSelect={() => {}}
      />
    );
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalled();
  });

  it("disables Select button when nothing is selected", () => {
    render(
      <DataSourceModal
        open={true}
        dataSources={dataSources}
        onCancel={() => {}}
        onSelect={() => {}}
      />
    );
    const selectButton = screen.getByRole("button", { name: /select/i });
    expect(selectButton).toBeDisabled();
  });
});
