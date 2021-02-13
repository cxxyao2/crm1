import http from "./httpService";

const apiEndpoint = "http://localhost:5000/api/stockareas";

export function getStockareas() {
  return http.get(apiEndpoint);
}

const service = {
  getStockareas,
};

export default service;
