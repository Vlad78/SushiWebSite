import { Product, ResponseWrapper } from "@/types";
import qs from "qs";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products?`;

interface Query {
  categoryId?: string;
  isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<ResponseWrapper<Product>> => {
  const url =
    URL +
    qs.stringify({
      filters: {
        categoryId: query.categoryId,
        isFeatured: query.isFeatured,
      },
    });

  const res = await fetch(url);

  return res.json();
};

export default getProducts;
