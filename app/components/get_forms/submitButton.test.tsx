import { render, screen, fireEvent } from "@testing-library/react";
import SubmitButton from "./submitButton";
import React from "react";

describe("SubmitButton", () => {
  it("renders children and calls onSubmit", () => {
    const onSubmit = jest.fn();
    render(<SubmitButton onSubmit={onSubmit}>Submit</SubmitButton>);
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onSubmit).toHaveBeenCalled();
  });
});
