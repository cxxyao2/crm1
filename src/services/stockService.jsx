import http from "./httpService";

const apiEndpoint = "http://localhost:5000/api/stocks";

export function getStocks() {
  return http.get(apiEndpoint);
}

export function deleteStock(stockId) {
  return http.delete(apiEndpoint + "/" + stockId);
}

export function getStock(stockId) {
  return http.get(apiEndpoint + "/" + stockId);
}

export function saveStock(stock) {
  return http.post(apiEndpoint, stock);
}

export function updateStock(stock) {
  return http.put(apiEndpoint, stock);
}

const service = {
  getStocks,
  getStock,
  saveStock,
  updateStock,
  deleteStock,
};

export default service;
