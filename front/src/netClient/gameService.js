import http from "@/netClient/config";

export async function getGames() {
  try {
    const response = await http.get("/games/");
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function createGame(game) {
  try {
    const response = await http.post("/games/", game);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function getData() {
  try {
    const response = await http.get("/versions/data");
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function createVersion(version) {
  try {
    const response = await http.post("/versions/", version);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}