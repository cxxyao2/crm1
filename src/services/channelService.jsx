import http from "./httpService";

const apiEndpoint = "http://localhost:5000/api/channels";

export function getChannels() {
  return http.get(apiEndpoint);
}

export function deleteChannel(channelId) {
  return http.delete(apiEndpoint + "/" + channelId);
}

export function getChannelById(channelId) {
  return http.get(apiEndpoint + "/" + channelId);
}

export function getChannelByName(channelName) {
  return http.get(apiEndpoint + `/?name=${channelName}`);
}

export function saveChannel(channel) {
  return http.post(apiEndpoint, channel);
}

export function updateChannel(channel) {
  return http.put(apiEndpoint, channel);
}
