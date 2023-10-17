import { ResponseWrapper, Story } from "@/types";
import qs from "qs";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/stories?`;

const getStories = async (): Promise<ResponseWrapper<Story>> => {
  const url =
    URL +
    qs.stringify(
      {
        sort: ["order"],
        populate: "*",
      },
      {
        encodeValuesOnly: true,
      }
    );
  const res = await fetch(url);
  return res.json();
};

export default getStories;
