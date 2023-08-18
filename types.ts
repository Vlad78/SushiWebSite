interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ResponseWrapper<T> {
  data: T[];
  meta: { pagination: Pagination };
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  size: Size;
  color: Color;
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
}

export interface Story {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  attributes: { name: string; description: string; title: string };
  name: string;
  billboard: Story;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}
