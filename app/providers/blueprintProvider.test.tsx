import React from "react";
import { render, screen } from "@testing-library/react";
import { BlueprintProvider, BlueprintContext } from "./blueprintProvider";

jest.mock("digraph-js", () => {
  return {
    DiGraph: jest.fn().mockImplementation(() => ({
      addVertex: jest.fn(),
      addEdge: jest.fn(),
      traverseEager: jest.fn(() => []),
      getDeepParents: jest.fn(() => ({ toArray: () => [] })),
    })),
  };
});

describe("BlueprintProvider", () => {
  it("provides default context values", () => {
    let contextValue = null;
    render(
      <BlueprintProvider>
        <BlueprintContext.Consumer>
          {(value) => {
            contextValue = value;
            return <div>Test</div>;
          }}
        </BlueprintContext.Consumer>
      </BlueprintProvider>
    );
    expect(contextValue).toBeDefined();
    expect(contextValue!.data).toBeNull();
    expect(contextValue!.graph).toBeNull();
    expect(contextValue!.isLoading).toBe(false);
    expect(contextValue!.isError).toBe(false);
    expect(typeof contextValue!.setRequestOptions).toBe("function");
  });

  it("renders children", () => {
    render(
      <BlueprintProvider>
        <div>Child</div>
      </BlueprintProvider>
    );
    expect(screen.getByText("Child")).toBeInTheDocument();
  });
});
