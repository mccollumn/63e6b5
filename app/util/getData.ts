"use server";

/**
 * Fetches blueprint graph data from the specified server for a given tenant and blueprint.
 *
 * @param server - The base URL of the server to fetch data from.
 * @param tenantID - The unique identifier of the tenant.
 * @param blueprintID - The unique identifier of the blueprint.
 * @param blueprintVersionID - (Optional) The version ID of the blueprint.
 * @returns The fetched blueprint graph data as JSON.
 * @throws Throws an error if the fetch operation fails or the response is not OK.
 */
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
      throw new Error(`Error fetching data: ${error.message}`);
    }
    return { message: String(error) };
  }
};
