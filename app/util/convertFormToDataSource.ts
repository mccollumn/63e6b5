import { BlueprintForm } from "@/types/blueprintGraph";
import { DataSource } from "@/types/dataSource";

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
