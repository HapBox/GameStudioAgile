import http from "@/netClient/config";

export async function fetchBugsList(id) {
  try {
    const response = await http.get("/bugs/version/" + id);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function getVersions() {
  try {
    const response = await http.get("/bugs/data");
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function createBug(bug) {
  try {
    const response = await http.post("/bugs/", bug);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}