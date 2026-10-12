"use client";

import { baseURL } from "@/lib/utils";
import axiosAuthRequest from "./axiosAuthRequest";
import axios from "axios";

export async function getHomePageData() {
  return await axiosAuthRequest.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/Event"
  );
}

export async function getOrganizer(id, sort) {
  return await axiosAuthRequest(
    process.env.NEXT_PUBLIC_API_URL +
      `/api/Event/profile/?Id=${id}&OrderBy=${sort}`
  );
}

export async function FollowOrganizer(orgId) {
  return await axiosAuthRequest(
    process.env.NEXT_PUBLIC_API_URL +
      "/api/UserInfo/followings/follow?orgId=" +
      orgId
  );
}

export async function UnfollowOrganizer(orgId) {
  return await axiosAuthRequest(
    process.env.NEXT_PUBLIC_API_URL +
      "/api/UserInfo/followings/unfollow?orgId=" +
      orgId
  );
}

export async function LikeEvent(eventSlug) {
  return await axiosAuthRequest(
    process.env.NEXT_PUBLIC_API_URL + "/api/wishlist/add?slug=" + eventSlug
  );
}

export async function UnlikeEvent(eventSlug) {
  return await axiosAuthRequest(
    process.env.NEXT_PUBLIC_API_URL + "/api/wishlist/remove?slug=" + eventSlug
  );
}

export async function getCategory(name, page = 1, sort = "A-Z", q) {
  const query = `${baseURL}/Event/category?searchQuery=${q}&categoryName=${name}&pageNo=${page}&pageSize=12&sort=${sort}`;
  return await axios.get(query);
}

export async function getTodayEvents() {
  return await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/event/today");
}

export async function getWeekendEvents() {
  return await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/event/weekend"
  );
}

export async function getEventDetails(slug, secret) {
  let params = "";
  if (secret) params += "&secret=" + secret;
  const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api/Event/Detail`;
  return await axiosAuthRequest.get(`${baseURL}?slug=${slug}${params}`);
}

export async function getEventTickets(event_id, secret) {
  let params = ["slug=" + event_id];
  if (secret) params.push("secret=" + secret);
  return await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/Event/tickets?" + params.join("&")
  );
}

export async function getLiveSearch(data) {
  try {
    const response = await fetch(`${baseURL}/search/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response?.ok) {
      return null;
    }
    const result = await response?.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  };
}

export const getForYouEvents = async (location) => {
  try {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (location) {
      option.body = JSON.stringify(location);
    }
    const result = await fetch(`${baseURL}/event/foryou`, option);
    if (!result?.ok) {
      return null;
    }
    const res = await result?.json();
    return { data: res };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function getPopularSearches() {
  return await axiosAuthRequest.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/Search/PopularSearch?skip=0&take=10"
  );
}
export async function getSelectionData(slug, secret = null) {
  try {
    const response = await fetch(
      `${baseURL}/Event/layout/tickets?slug=${slug}&secret=${
        secret ? secret : ""
      }`
    );
    if (!response?.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
// Checkout - Start

export async function placeTheOrder(order) {
  return await axiosAuthRequest.post(
    process.env.NEXT_PUBLIC_API_URL + "/api/checkout",
    order
  );
}

export async function placeLayoutOrder(order) {
  return await axiosAuthRequest.post(
    process.env.NEXT_PUBLIC_API_URL + "/api/checkout/LayoutOrder",
    order
  );
}
export async function requestHybridOrder(order) {
  return await axiosAuthRequest.post(
    process.env.NEXT_PUBLIC_API_URL + "/api/checkout/HybridOrder",
    order
  );
}

export async function getClientSecret(orderId) {
  return await axios.get(
    process.env.NEXT_PUBLIC_API_URL +
      "/api/checkout/clientsecret?orderId=" +
      orderId
  );
}

export async function completeTheOrder(paymentIntentId, orderId) {
  return await axios.post(
    process.env.NEXT_PUBLIC_API_URL +
      "/api/checkout/complete?paymentIntentId=" +
      paymentIntentId +
      "&id=" +
      orderId
  );
}

export async function cancelTheOrder(orderId) {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/checkout/cancel?id=" + orderId
    );
    return response;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
}

// Checkout - End

// Accounts - Start

export async function LoginUser(data) {
  return await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/api/Auth/Login",
    data
  );
}

export const registerUserRequest = async (data) => {
  try {
    const response = await fetch(`${baseURL}/Auth/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response?.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function getOrderTickets(id) {
  return await axiosAuthRequest.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/detail?id=${id}`
  );
}

export async function getOrderTicketsNonLoggedIn(id, sec) {
  return await axios.get(
    process.env.NEXT_PUBLIC_API_URL +
      "/api/ticket/myticket?id=" +
      id +
      "&sec=" +
      sec
  );
}

export async function getUserNotifications() {
  return await axiosAuthRequest.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/auth/userinfo/notification"
  );
}

export async function updateMarketingNotification() {
  return await axiosAuthRequest.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/auth/marketingnotification"
  );
}

export async function updateWishlistNotification() {
  return await axiosAuthRequest.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/auth/wishlistnotification"
  );
}

export async function updateFollowersNotification() {
  return await axiosAuthRequest.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/auth/organizerfollownotification"
  );
}

export async function getFollowings() {
  return await axiosAuthRequest(
    process.env.NEXT_PUBLIC_API_URL + "/api/userInfo/followings"
  );
}

export async function getWishlist() {
  return await axiosAuthRequest(
    process.env.NEXT_PUBLIC_API_URL + "/api/wishlist"
  );
}

export async function getUserOrders() {
  return await axiosAuthRequest.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/tickets?pageNo=1&pageSize=10"
  );
}

export async function getUserProfile() {
  return await axiosAuthRequest.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/auth/userinfo"
  );
}

export async function updateUserProfile(data) {
  return await axiosAuthRequest.post(
    process.env.NEXT_PUBLIC_API_URL + "/api/auth/updateprofile",
    data
  );
}

export async function updateUserProfileImage(file) {
  let form = new FormData();
  form.append("file", file);
  return await axiosAuthRequest.post(
    process.env.NEXT_PUBLIC_API_URL + "/api/auth/updateprofile/image",
    form,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
}

export async function resetPassword(email, password, code) {
  return await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/api/auth/resetpassword",
    {
      email,
      password,
      confirmPassword: password,
      token: code,
    }
  );
}

export async function confirmEmail(userId, token) {
  return await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/api/auth/confirmemail",
    {
      userId,
      token,
    }
  );
}

// Accounts - End

// Blogs - Start

export async function getBlogs() {
  return await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/blogs");
}

export async function getBlogArticles(slug) {
  return await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/blogs/articles?slug=" + slug
  );
}

export async function getArticleDetails(slug) {
  return await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/blogs/articles/detail?slug=" + slug
  );
}

// Blogs - End

export async function newsletterSubscribe(token, email) {
  return await axios.get(
    process.env.NEXT_PUBLIC_API_URL +
      "/api/newsletter/Subscribe?token=" +
      token +
      "&email=" +
      email
  );
}

export async function contactUs(data) {
  return await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/api/contactus",
    data
  );
}

export const getAllEvents = async () => {
  try {
    const response = await fetch(`${baseURL}/Event/SelectEvent`);
    if (!response?.ok) {
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const findTickets = async (email, eventId) => {
  try {
    const result = await fetch(
      `${baseURL}/Tickets/find?email=${email}&eventId=${eventId}`
    );
    if (!result?.ok) {
      return null;
    }
    const res = await result?.json();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchCategory = async (query) => {
  try {
    const result = await fetch(query);
    if (!result?.ok) {
      return null;
    }
    const res = await result?.json();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};
