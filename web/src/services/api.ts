import axios from "axios";

const IP = "192.168.1.67";

const api = axios.create({
  baseURL: `http://${IP}:3333`,
});

export default api;
