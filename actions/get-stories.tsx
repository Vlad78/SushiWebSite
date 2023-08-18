import { Story } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/stories`;

const getStories = async (): Promise<Story[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getStories;
