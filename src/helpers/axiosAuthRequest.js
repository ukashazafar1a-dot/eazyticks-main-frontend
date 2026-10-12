"use client";

import { fetchCookie } from "@/lib/utils";
import axios from "axios";

const axiosAuthRequest = axios.create({});

axiosAuthRequest.interceptors.request.use(function (config) {
  const user = JSON.parse(fetchCookie());

  if (user) {
    config.headers.Authorization = `Bearer ${user?.token}`;
  }

  return config;
});

// Add a response interceptor
axiosAuthRequest.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("Interceptor response",response)
    return response;
  },
  function (error) {
    
    if (error?.response?.status === 401) {
      // if (typeof window !== undefined) {
      //   window.location.href = "/";
      //   window.location.reload();
      // }
      console.log("Interceptor error", error);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosAuthRequest;
