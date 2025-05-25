import { render, screen, fireEvent } from "@testing-library/react";
import ListItem from "./listItem";
import React from "react";

describe("ListItem", () => {
  it("renders children inside Typography", () => {
    render(<ListItem>Test Item</ListItem>);
    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });

  it("calls onCancel when CancelIcon is clicked", () => {
    const onCancel = jest.fn();
    render(<ListItem onCancel={onCancel}>Test Item</ListItem>);
    fireEvent.click(screen.getByTestId("CancelIcon"));
    expect(onCancel).toHaveBeenCalled();
  });
});
