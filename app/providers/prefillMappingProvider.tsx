"use client";

import React from "react";
import { GlobalPrefillMapping } from "@/types/dataSource";

/**
 * Context type for managing the global prefill mapping state.
 *
 * @property {GlobalPrefillMapping[]} globalPrefillMapping - The current array of global prefill mappings.
 * @property {React.Dispatch<React.SetStateAction<GlobalPrefillMapping[]>>} setGlobalPrefillMapping - Function to update the global prefill mapping array.
 */
interface PrefillContextType {
  globalPrefillMapping: GlobalPrefillMapping[];
  setGlobalPrefillMapping: React.Dispatch<
    React.SetStateAction<GlobalPrefillMapping[]>
  >;
}

const PrefillMappingContext = React.createContext<PrefillContextType>({
  globalPrefillMapping: [],
  setGlobalPrefillMapping: () => {},
});

const PrefillMappingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [globalPrefillMapping, setGlobalPrefillMapping] = React.useState<
    GlobalPrefillMapping[]
  >([]);

  return (
    <PrefillMappingContext.Provider
      value={{
        globalPrefillMapping,
        setGlobalPrefillMapping: setGlobalPrefillMapping,
      }}
    >
      {children}
    </PrefillMappingContext.Provider>
  );
};

export { PrefillMappingProvider, PrefillMappingContext };
