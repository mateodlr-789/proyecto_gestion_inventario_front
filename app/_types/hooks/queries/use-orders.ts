export interface IOrder {
  id: number;
  tableNumber: string;
  user_id: number;
  types_id: number;
  createdAt: string;
}

export interface ICreateOrder {
  name: string;  
  user_id: number;      
  types_id: number;   
}

export interface IDeleteOrder {
  id: number;
}