import { BlueprintForm, BlueprintGraph } from "@/types/blueprintGraph";

/**
 * Retrieves a form object from the blueprint graph using a given node ID.
 *
 * @param formNodeID - The ID of the node representing the form in the graph.
 * @param data - The blueprint graph containing nodes and forms.
 * @returns The corresponding `BlueprintForm` if found, otherwise `null`.
 */
const getFormFromNodeID = (formNodeID: string, data: BlueprintGraph) => {
  const formNode = data.nodes.find((node) => node.id === formNodeID);
  if (!formNode) return null;
  const formID = formNode.data.component_id;
  const form = data.forms.find((form) => form.id === formID) as BlueprintForm;

  return form;
};

export default getFormFromNodeID;
