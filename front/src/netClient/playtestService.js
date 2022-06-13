import http from "@/netClient/config";

export async function getPlaytests() {
  try {
    const response = await http.get("/playtests/");
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function createPlaytest(playtest) {
  try {
    const response = await http.post("/playtests/", playtest);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}