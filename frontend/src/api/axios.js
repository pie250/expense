import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-frontend-gouc.onrender.com",
});

export default API;