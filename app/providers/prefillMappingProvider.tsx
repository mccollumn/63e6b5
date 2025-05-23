"use client";

import React from "react";
import { GlobalPrefillMapping } from "@/types/dataSource";

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
