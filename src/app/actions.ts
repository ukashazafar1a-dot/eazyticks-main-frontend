"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { Site } from "@/helpers/Site";

export const returnDescription = (
  name: string | null,
  organizer: string | null
) => {
  const description = `${name && name + "Event Organized By"} ${
    organizer ? organizer : Site?.name
  }. From concerts to sports and theater to comedy, our organizers offers a wide variety of events to choose from. Get your tickets today and join the fun!`;
  return description;
};

const user = "eztUser";
export const authenticateAdmin = async (user: any) => {
  if (user) {
    const decodeToken: any = await jwtDecode(user?.token);
    if (!decodeToken) return false;
    if (decodeToken?.Permission && decodeToken?.Permission.length > 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export async function setCookie(sessionData: any) {
  const userData = JSON.stringify(sessionData);
  cookies().set(user, userData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return true;
}

export async function getCookie() {
  const encryptedSessionData = cookies().get(user)?.value;
  return encryptedSessionData ? JSON.parse(encryptedSessionData) : null;
}

export async function deleteCookie() {
  cookies().delete(user);
  return true;
}


