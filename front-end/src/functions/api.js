import axios from "axios";

export const BASE_URL = process.env.REACT_APP_DOMAIN;

export const normalAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});