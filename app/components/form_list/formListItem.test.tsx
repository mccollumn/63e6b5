import { render, screen, fireEvent } from "@testing-library/react";
import FormListItem from "./formListItem";
import React from "react";
import { BlueprintNode } from "@/types/blueprintGraph";

describe("FormListItem", () => {
  it("renders the form node name and calls onClick", () => {
    const formNode = { data: { name: "Form A" } } as BlueprintNode;
    const onClick = jest.fn();
    render(<FormListItem formNode={formNode} onClick={onClick} />);
    const item = screen.getByText("Form A");
    expect(item).toBeInTheDocument();
    fireEvent.click(item);
    expect(onClick).toHaveBeenCalledWith(formNode);
  });
});
