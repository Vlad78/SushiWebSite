import { Category, ResponseWrapper } from "@/types";
import qs from "qs";

interface Query {
  isFeatured?: boolean;
}

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories?`;

const getCategories = async (query: Query): Promise<ResponseWrapper<Category>> => {
  const url =
    URL +
    qs.stringify(
      {
        sort: ["order"],
        populate: "*",
        filters: {
          isFeatured: query.isFeatured,
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

  const res = await fetch(url);
  // const res = query === undefined ? await fetch(URL+query) : await fetch(URL+defaultQuery)
  return res.json();
};

export default getCategories;
