export interface TesloProduct {
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
  user: TesloUser;
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

export interface TesloUser {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}
