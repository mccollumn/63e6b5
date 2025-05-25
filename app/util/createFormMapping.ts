import { BlueprintForm } from "@/types/blueprintGraph";
import { PrefillMapping } from "@/types/dataSource";
import convertFormToDataSource from "./convertFormToDataSource";

/**
 * Generates a prefill mapping array from a given BlueprintForm.
 *
 * This function converts the provided form into a data source, then maps each property
 * of the data source to a new object that includes all original property fields and sets
 * the `value` field to `null` by default.
 *
 * @param form - The BlueprintForm object to be converted into a prefill mapping.
 * @returns An array of PrefillMapping objects, each representing a property from the form with a default `value` of `null`.
 */
const createFormMapping = (form: BlueprintForm): PrefillMapping[] => {
  const dataSource = convertFormToDataSource(form);
  return dataSource.properties.map((property) => {
    return { value: null, ...property };
  });
};

export default createFormMapping;
