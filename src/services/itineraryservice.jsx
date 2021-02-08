import http from "./httpService";

const apiEndpoint = "http://localhost:5000/api/itineraries";

export function getItinerary(query) {
  let url = apiEndpoint + "/?" + query;
  
  return http.get(url);
}

export function deleteItinerary(itineraryId) {
  return http.delete(apiEndpoint + "/" + itineraryId);
}

export function getItineraryById(itineraryId) {
  return http.get(apiEndpoint + "/" + itineraryId);
}

export function saveItinerary(itineraryId) {
  return http.post(apiEndpoint, itineraryId);
}
