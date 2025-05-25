import { render, screen, fireEvent } from "@testing-library/react";
import PrefillListItem from "./prefillListItem";
import React from "react";

describe("PrefillListItem", () => {
  it("renders children and calls onClick", () => {
    const onClick = jest.fn();
    const onClear = jest.fn();
    render(
      <PrefillListItem
        name="foo"
        value="bar"
        formNodeID="id1"
        onClick={onClick}
        onClear={onClear}
      >
        Test Child
      </PrefillListItem>
    );
    fireEvent.click(screen.getByText("Test Child"));
    expect(onClick).toHaveBeenCalledWith("id1", "foo");
  });

  it("renders gray text if value is falsey", () => {
    render(
      <PrefillListItem
        name="foo"
        value={null}
        formNodeID="id1"
        onClick={() => {}}
        onClear={() => {}}
      >
        Gray Child
      </PrefillListItem>
    );
    const child = screen.getByText("Gray Child");
    expect(child).toHaveStyle({ color: "gray" });
  });
});
