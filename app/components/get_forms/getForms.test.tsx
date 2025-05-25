import { render, screen } from "@testing-library/react";
import GetForms from "./getForms";
import React from "react";

describe("GetForms", () => {
  it("renders all input fields and submit button", () => {
    render(<GetForms handleAccordionChange={() => {}} />);
    expect(screen.getByLabelText(/Server/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tenant ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Blueprint ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Blueprint Version ID/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /get forms/i })
    ).toBeInTheDocument();
  });
});
