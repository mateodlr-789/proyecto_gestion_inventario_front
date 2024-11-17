"use client";

import { Layout } from "./_components/layout";
import AddOrderButton from './_components/addOrderButton';
import OrderCard from './_components/orderCard';
import { useOrder } from '@/app/_hooks'; 
import { IOrder } from '@/app/_types'; 


export default function Page()  {
  const { getOrders } = useOrder();
  const { data: orders, isLoading, isError } = getOrders; 
  
  console.log("Datos de órdenes en Page:", orders);
  
  if (isLoading) return <div>Cargando...</div>;
  if (isError || !orders || !Array.isArray(orders)) return <div>No hay órdenes disponibles o error al cargar.</div>;

  return (
    
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {orders.map((order: IOrder) => (
          <OrderCard key={order.id} tableName={order.tableNumber} status="Pending"  createdAt={order.createdAt}/>
        ))}
        <AddOrderButton />
      </div>  
      
    </Layout>
  );
}




