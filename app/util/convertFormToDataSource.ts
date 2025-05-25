import { BlueprintForm } from "@/types/blueprintGraph";
import { DataSource } from "@/types/dataSource";

/**
 * Converts a `BlueprintForm` object into a `DataSource` object.
 *
 * Iterates over the properties defined in the form's `field_schema` and maps each property
 * to a corresponding entry in the `DataSource`'s `properties` array, preserving the property
 * name and its `avantos_type` as the type.
 *
 * @param form - The `BlueprintForm` object containing the schema and metadata to convert.
 * @returns A `DataSource` object with the same id and name as the form, and a properties array
 *          derived from the form's field schema.
 */
const convertFormToDataSource = (form: BlueprintForm) => {
  const formProperties = form.field_schema.properties;
  const dataSource: DataSource = {
    id: form.id,
    name: form.name,
    properties: [],
  };

  Object.keys(formProperties).forEach((key) => {
    dataSource.properties.push({
      name: key,
      type: formProperties[key].avantos_type,
    });
  });

  return dataSource;
};

export default convertFormToDataSource;
