import http from "@/netClient/config";

export async function doLogin(login, password) {
  try {
    const response = await http.post("/auth/login", {
      login,
      password,
    });
    const { accessToken } = response.data;
    localStorage.workerPosition = response.data.workerPosition;
    localStorage.accessToken = accessToken;
    return accessToken;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function doLogout() {
  try {
    const response = await http.post("/auth/logout");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("workerPosition");
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function getRegistartionData() {
  try {
    const response = await http.get("/auth/data");
    return response.data;
  } catch (error) {
    console.error({ error });
    throw error;
  }
}

export async function doRegister(worker) {
    try {
      const response = await http.post("/auth/registration", worker);
      return response.data;
    } catch (error) {
      console.error({ error });
      throw error;
    }
  }