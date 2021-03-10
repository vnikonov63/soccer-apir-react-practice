import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function fetchReverseGeolocation(positionInfo) {
  const apiAdress = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${positionInfo.Latitude},${positionInfo.Longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const response = await axios.get(apiAdress);
  const humanReadable = response.data.results.find((adress) => {
    return adress.types.includes("administrative_area_level_1");
  });
  return humanReadable.formatted_address;
}

async function fetchReverseGeolocationEngland(positionInfo) {
  const apiAdress = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${positionInfo.Latitude},${positionInfo.Longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const response = await axios.get(apiAdress);
  const humanReadable = response.data.results.find((adress) => {
    return adress.types.includes("administrative_area_level_2");
  });
  return humanReadable.formatted_address;
}

export {
  fetchReverseGeolocation,
  fetchReverseGeolocationEngland
}
