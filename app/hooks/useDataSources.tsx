import React from "react";
import { BlueprintContext } from "@/providers/blueprintProvider";
import getFormFromNodeID from "@/util/getFormFromNodeID";
import createFormMapping from "@/util/createFormMapping";
import { BlueprintForm } from "@/types/blueprintGraph";
import { DataSource } from "@/types/dataSource";

const useDataSources = (formNodeID: string | null) => {
  // Create and store data sources. Both form and custom.
  // Return data sources that are the provided form's dependencies.
  const [dataSources, setDataSources] = React.useState<DataSource[]>([]);
  const { data, graph } = React.useContext(BlueprintContext);

  React.useEffect(() => {
    if (!formNodeID || !graph || !data) return;

    const formDependencies = graph.getDeepParents(formNodeID).toArray();
    const forms = formDependencies.map((node) => getFormFromNodeID(node, data));
    const formNodes = formDependencies.map((node) =>
      data.nodes.find((n) => n.id === node)
    );
    forms.forEach((form, index) => {
      const formNodeName = formNodes[index]?.data.name ?? "";
      const formNodeID = formNodes[index]?.id ?? "";
      const mapping = createFormMapping(form as BlueprintForm);
      console.log("Mapping for form", form?.id, mapping);
      setDataSources((prev) => [
        ...prev,
        { name: formNodeName, id: formNodeID, properties: [...mapping] },
      ]);
    });

    console.log("formDependencies", formDependencies);
    console.log("forms", forms);
    console.log("formNodes", formNodes);
  }, [data, formNodeID, graph]);

  return {
    dataSources,
  };
};

export default useDataSources;
