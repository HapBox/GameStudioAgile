import http from "@/netClient/config";

export async function getTasks() {
  try {
    const response = await http.get("/tasks/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function createTask(task) {
  try {
    const response = await http.post("/tasks/", task);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function getData() {
  try {
    const response = await http.get("/tasks/data");
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function pickTask(id, task) {
  try {
    const response = await http.patch("/tasks/" + id, task);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function addWorkerToTask(id) {
  try {
    const response = await http.post("/tasks/" + id);
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}
