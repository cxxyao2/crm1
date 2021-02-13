import http from "./httpService";

const apiEndpoint = "http://localhost:5000/api/orders";

export function getOrders() {
  return http.get(apiEndpoint);
}

export function deleteOrder(orderId) {
  return http.delete(apiEndpoint + "/" + orderId);
}

export function getOrder(orderId) {
  return http.get(apiEndpoint + "/" + orderId);
}

export function saveOrder(order) {
  return http.post(apiEndpoint, order);
}

export function upOrder(order) {
  return http.put(apiEndpoint, order);
}
