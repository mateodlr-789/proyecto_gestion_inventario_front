export interface IOrder {
  id: number;
  tableNumber: string;
  user_id: number;
  types_id: number;
  createdAt: string;
}

export interface ICreateOrder {
  tableNumber: number;
  items: string[];
}

export interface IDeleteOrder {
  id: number;
}