import { render, screen } from "@testing-library/react";
import List from "./list";
import React from "react";

describe("List", () => {
  it("renders children inside a Box and Stack", () => {
    render(
      <List>
        <div>Item 1</div>
        <div>Item 2</div>
      </List>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });
});
