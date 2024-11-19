export interface IOrderProduct {
    id: number;
    order_id: number;
    product_id: number;
    total: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface IAddOrderProduct {
    order_id: number;
    products: {
      product_id: number;
      total: number;
    }[];
  }
  