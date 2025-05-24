import { BlueprintForm, BlueprintGraph } from "@/types/blueprintGraph";

const getFormFromNodeID = (formNodeID: string, data: BlueprintGraph) => {
  const formNode = data.nodes.find((node) => node.id === formNodeID);
  if (!formNode) return null;
  const formID = formNode.data.component_id;
  const form = data.forms.find((form) => form.id === formID) as BlueprintForm;

  return form;
};

export default getFormFromNodeID;
