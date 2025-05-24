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
