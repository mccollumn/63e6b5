"use server";

export const getData = async (
  server: string,
  tenantID: string,
  blueprintID: string,
  blueprintVersionID?: string
) => {
  try {
    // Documentation indicates that a blueprint version ID is required, but the mock server isn't expecting one
    const url = `${server}/api/v1/${tenantID}/actions/blueprints/${blueprintID}${
      blueprintVersionID ? `/${blueprintVersionID}` : ""
    }/graph`;

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
