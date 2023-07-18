import { normalAxiosInstance as axios } from "./api";

export const getData = (page = 1, limit = 10) =>
  axios.get(`/data?page=${page}&limit=${limit}`);

export const getVideoData = (page = 1, limit = 10) =>
  axios.get(`/video?page=${page}&limit=${limit}`);

export const searchVideoData = (q = "", page = 1, limit = 10) =>
  axios.get(`/video/search?q=${q}&page=${page}&limit=${limit}`);
