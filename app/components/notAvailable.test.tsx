import { render, screen } from "@testing-library/react";
import NotAvailable from "./notAvailable";
import React from "react";

describe("NotAvailable", () => {
  it("renders children inside Typography with warning color", () => {
    render(<NotAvailable>Not Found</NotAvailable>);
    const text = screen.getByText("Not Found");
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass("MuiTypography-root");
  });
});
