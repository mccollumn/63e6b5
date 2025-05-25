import { render, screen, fireEvent } from "@testing-library/react";
import TextInput from "./textInput";
import React from "react";

describe("TextInput", () => {
  it("renders label and value", () => {
    render(<TextInput label="Test Label" value="Test Value" />);
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Value")).toBeInTheDocument();
  });

  it("calls onChange when input changes", () => {
    const onChange = jest.fn();
    render(<TextInput label="Test Label" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText("Test Label"), {
      target: { value: "abc" },
    });
    expect(onChange).toHaveBeenCalled();
  });
});
