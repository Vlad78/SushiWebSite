interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ResponseWrapper<T> {
  data: T[];
  meta?: { pagination: Pagination };
}

export interface Product {
  id: string;
  attributes: {
    title: string;
    descShort: string;
    descLong: string;
    price: number;
    discount_price: number;
    discount_value: number;
    discount_start_date: string;
    discount_end_date: string;
    isFeatured: boolean;
    categories: Categories;
    img: Images;
    url: string;
    name: string;
  };
}

interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

interface ImageProps {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
  provider_metadata: ProviderMetadata;
}

export interface Image {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    caption?: any;
    width: number;
    height: number;
    formats: {
      small: ImageProps;
      medium: ImageProps;
      thumbnail: ImageProps;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    provider_metadata: ProviderMetadata;
  };
}

export interface Images {
  data: Image[];
}

export interface Story {
  id: string;
  attributes: {
    title: string;
    startAt: string;
    endAt: string;
    isFired: boolean;
    img: Images;
    isFeatured: boolean;
  };
}

export interface Category {
  id: string;
  attributes: {
    name: string;
    description: string;
    title: string;
    order: number;
    img: Images;
    icon: Images;
    url: string;
    isFeatured: boolean;
  };
}

export interface Categories {
  data: Category[];
}

export interface Address {
  name?: string;
  address: string;
  lat: number;
  lng: number;
  type: "pick-up" | "delivery";
  workingHours?: string;
}

export interface User {
  blocked: boolean;
  confirmed: boolean;
  createdAt: Date;
  email: string | null;
  id: string;
  phoneNumber: string;
  provider: "local";
  updatedAt: Date | null;
  username: string | null;
  birthDay?: {
    day: number;
    month: number;
  } | null;
  BDDay: number;
  BDMonth: number;
  isSubscribedForMail: boolean;
}
