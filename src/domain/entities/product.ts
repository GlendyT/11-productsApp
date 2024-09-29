export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
}

export enum Gender {
  Kid = 'kid',
  Woman = 'woman',
  Man = 'man',
  Unisex = 'unisex',
}

export enum Size {
  L = 'L',
  S = 'S',
  M = 'M',
  XL = 'XL',
  XS = 'XS',
  XXL = 'XXL',
}
