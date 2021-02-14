import http from "./httpService";

const apiEndpoint = "http://localhost:5000/api/stocks";

export function getStocks(area) {
  const params = new URLSearchParams([["area", area]]);
  return http.get(apiEndpoint, { params });
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
  const updateUrl = apiEndpoint + "/" + stock._id;
  return http.put(updateUrl, {
    areaId: stock.area._id,
    productId: stock.product._id,
    quantity: stock.quantity,
    expiredDate: stock.expiredDate,
  });
}

const service = {
  getStocks,
  getStock,
  saveStock,
  updateStock,
  deleteStock,
};

export default service;
