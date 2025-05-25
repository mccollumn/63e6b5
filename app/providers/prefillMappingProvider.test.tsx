import React from "react";
import { render, screen } from "@testing-library/react";
import {
  PrefillMappingProvider,
  PrefillMappingContext,
} from "./prefillMappingProvider";

describe("PrefillMappingProvider", () => {
  it("provides default context values", () => {
    let contextValue = null;
    render(
      <PrefillMappingProvider>
        <PrefillMappingContext.Consumer>
          {(value) => {
            contextValue = value;
            return <div>Test</div>;
          }}
        </PrefillMappingContext.Consumer>
      </PrefillMappingProvider>
    );
    expect(contextValue).toBeDefined();
    expect(contextValue!.globalPrefillMapping).toEqual([]);
    expect(typeof contextValue!.setGlobalPrefillMapping).toBe("function");
  });

  it("renders children", () => {
    render(
      <PrefillMappingProvider>
        <div>Child</div>
      </PrefillMappingProvider>
    );
    expect(screen.getByText("Child")).toBeInTheDocument();
  });
});
