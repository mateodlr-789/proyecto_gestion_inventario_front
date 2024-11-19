export interface IProduct {
    id: number;
     name: string;
     price: number;
     stock: number;
     createdAt: string;
     image_url: string;
   }
   
   export interface ICreateProduct {
     name: string;
     price: number;
     stock: number;
   }
   
   export interface IDeleteProduct {
     id: number;
   }
 
   export interface SelectedProduct extends IProduct {
     quantity: number;
     createdAt: string;
   } 