import { User } from "@/types";
import Cookies from "js-cookie";
import qs from "qs";

interface Query {
  user: User;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user/me`;

const putUser = async (query: Query): Promise<User> => {
  try {
    const res = await fetch(URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
      body: JSON.stringify(query.user),
    });
    return res.json() as Promise<User>;
  } catch (e) {
    console.log(e);
    return query.user;
  }
};

export default putUser;
