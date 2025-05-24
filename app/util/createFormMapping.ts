import { BlueprintForm } from "@/types/blueprintGraph";
import { PrefillMapping } from "@/types/dataSource";
import convertFormToDataSource from "./convertFormToDataSource";

const createFormMapping = (form: BlueprintForm): PrefillMapping[] => {
  const dataSource = convertFormToDataSource(form);
  return dataSource.properties.map((property) => {
    return { value: null, ...property };
  });
};

export default createFormMapping;
