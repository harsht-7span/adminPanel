import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
  headers: {
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",

    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});

export default axiosClient;
