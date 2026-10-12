export interface Organizer {
  id: number;
  code: string;
  name: string;
  img: string;
  collections: number;
  products: number;
}

export interface Product {
  id: number;
  name: string;
  image: string | null;
  startingPrice: number;
  collections: any[];
}

export interface OrganizerProduct {
  data: Product[];
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: number;
  name: string;
  price: number;
  stock: number;
  option1?: string | null;
  option2?: string | null;
  option3?: string | null;
}
