export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    quantity: number;
  }