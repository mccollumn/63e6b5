import { render, screen } from "@testing-library/react";
import FormList from "./formList";
import React from "react";

describe("FormList", () => {
  it("renders NotAvailable if no forms", () => {
    jest.mock("@/providers/blueprintProvider", () => ({
      BlueprintContext: React.createContext({ graph: null, isError: false }),
    }));
    render(<FormList handleFormClick={() => {}} />);
    expect(screen.getByText("No forms available")).toBeInTheDocument();
  });
});
