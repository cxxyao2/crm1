import http from "./httpService";

const apiEndpoint = "http://localhost:5000/api/channels";

export function getChannels() {
  return http.get(apiEndpoint);
}

export function deleteChannel(channelId) {
  return http.delete(apiEndpoint + "/" + channelId);
}

export function getChannel(channelId) {
  return http.get(apiEndpoint + "/" + channelId);
}

export function saveChannel(channel) {
  return http.post(apiEndpoint, channel);
}

export function upChannel(channel) {
  return http.put(apiEndpoint, channel);
}
