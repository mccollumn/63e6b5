import { render, screen } from "@testing-library/react";
import Title from "./title";
import React from "react";

describe("Title", () => {
  it("renders children inside Typography", () => {
    render(<Title>Test Title</Title>);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Title").tagName).toMatch(/H/i); // Typography renders as h6 by default
  });
});
