import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API_URL;

if (!baseURL) {
  throw new Error(
    "VITE_BASE_API_URL is missing. Please define it in your .env file."
  );
}

export const API = axios.create({ baseURL });
