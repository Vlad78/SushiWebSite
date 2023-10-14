import axios from "axios";
import Cookies from "js-cookie";
import { User } from "../types";

export const setToken = ({ jwt, id }: { jwt: string; id: string }) => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("id", id);
  Cookies.set("jwt", jwt);
};

export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id");
  Cookies.remove("jwt");
};

export async function getUserFromLocalCookie() {
  const jwt = getTokenFromLocalCookie();

  if (jwt) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me`, {
        cache: "no-store",
        // cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      return await response.json();
    } catch (e) {
      console.error(e);
      return null;
    }
  } else {
    return null;
  }
}

export const getTokenFromLocalCookie = () => {
  return Cookies.get("jwt");
};
