/**
 * Asynchronously fetches and returns the data sources configuration from the server.
 *
 * Attempts to retrieve the JSON configuration from `/data_sources/config.json`.
 * If the fetch fails or the response is not OK, returns an object with an error message.
 *
 * @returns {Promise<any>} The parsed JSON configuration object if successful,
 * or an object containing an error message if an error occurs.
 */
export const getDataSources = async () => {
  try {
    const res = await fetch("/data_sources/config.json");
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
