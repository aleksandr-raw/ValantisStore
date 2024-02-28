export type Product = {
  brand: string | null;
  id: string;
  price: number;
  product: string;
};

export type Products = Product[];

export type FilterValue = {
  [key: string]: string | number | null;
};

export type ProductId = string;

export type ProductIds = ProductId[] | null;
