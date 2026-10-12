"use client";

import axios from "axios";

const askForPermission = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const getLocationFromCoords = async (coords) => {
  let apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
  const { latitude, longitude } = coords;
  return await axios.get(
    "https://api.geoapify.com/v1/geocode/reverse?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&apiKey=" +
      apiKey
  );
};

export async function getUserLocation() {
  const response = await askForPermission();
  if (response?.coords) {
    const { data } = await getLocationFromCoords(response.coords);
    if (data?.features) {
      const { city, state } = data.features[0].properties;
      let location = {
        city,
        state,
      };
      return location;
    }
  }
  return null;
}
