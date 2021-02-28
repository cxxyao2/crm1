import http from "./httpService";
import * as config from "../config/config.json";

export function getStockareas() {
  // "http://localhost:5000/api/stockareas";
  const apiEndPoint = config.apiUrl.concat("/stockareas");

  return http.get(apiEndPoint);
}

export function getCategories() {
  const apiEndPoint = config.apiUrl.concat("/categories");
  return http.get(apiEndPoint);
}

const service = {
  getStockareas,
  getCategories,
};

export default service;
