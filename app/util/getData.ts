"use server";

export const getData = async (
  server: string,
  tenantID: string,
  blueprintID: string
) => {
  try {
    // /api/v1/{tenant_id}/actions/blueprints/{action_blueprint_id}/{blueprint_version_id}/graph

    // TODO: Look into version ID
    const url = `${server}/api/v1/${tenantID}/actions/blueprints/${blueprintID}/graph`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    }
    return { message: String(error) };
  }
};
