export interface BlueprintGraphDescription {
  $schema: string;
  id: string;
  tenant_id: string;
  name: string;
  description: string;
  category: string;
  nodes: BlueprintNode[];
  edges: BlueprintEdge[];
  forms: BlueprintForm[];
  branches: unknown[];
  triggers: unknown[];
}

export interface BlueprintNode {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: BlueprintNodeData;
}

export interface BlueprintNodeData {
  id: string;
  component_key: string;
  component_type: string;
  component_id: string;
  name: string;
  prerequisites: string[];
  permitted_roles: string[];
  input_mapping: Record<string, unknown>;
  sla_duration: {
    number: number;
    unit: string;
  };
  approval_required: boolean;
  approval_roles: string[];
}

export interface BlueprintEdge {
  source: string;
  target: string;
}

export interface BlueprintForm {
  id: string;
  name: string;
  description: string;
  is_reusable: boolean;
  field_schema: BlueprintFieldSchema;
  ui_schema: BlueprintUISchema;
  dynamic_field_config: Record<string, BlueprintDynamicFieldConfig>;
}

export interface BlueprintFieldSchema {
  type: string;
  properties: Record<string, BlueprintFieldProperty>;
  required: string[];
}

export interface BlueprintFieldProperty {
  avantos_type: string;
  title?: string;
  type: string;
  format?: string;
  items?: {
    enum: string[];
    type: string;
  };
  enum?: object[] | null;
  uniqueItems?: boolean;
}

export interface BlueprintUISchema {
  type: string;
  elements: BlueprintUIElement[];
}

export interface BlueprintUIElement {
  type: string;
  scope: string;
  label: string;
  options?: Record<string, unknown>;
}

export interface BlueprintDynamicFieldConfig {
  selector_field: string;
  payload_fields: Record<string, BlueprintPayloadField>;
  endpoint_id: string;
}

export interface BlueprintPayloadField {
  type: string;
  value: string;
}
