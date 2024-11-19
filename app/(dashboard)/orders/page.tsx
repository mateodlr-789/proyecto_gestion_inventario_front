"use client"

import { Layout } from "./_components/layout";
import AddOrderButton from './_components/addOrderButton';
import OrderCard from './_components/orderCard';
import { useRouter } from "next/navigation"; 
import { useOrder } from "@/app/_hooks/queries/orders/use-orders";
import { IOrder } from "@/app/_types";

export default function Page() {
  const { getOrders } = useOrder();
  const { data: orders, isLoading, isError } = getOrders;
  const router = useRouter(); 

  const handleSelectOrder = (orderId: number, tableName: string) => {
    router.push(`/orders/create-order?orderId=${orderId}&tableName=${tableName}`); 
  };

  if (isLoading) return <div>Cargando órdenes...</div>;
  if (isError || !orders || !Array.isArray(orders)) return <div>No hay órdenes disponibles o error al cargar.</div>;

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {orders?.map((order: IOrder) => (
          <div
            key={order.id}
            onClick={() => handleSelectOrder(order.id, order.tableNumber)}
          >
          <OrderCard key={order.id} tableName={order.tableNumber} status="Pending"  createdAt={order.createdAt}/>
          
            </div>  
          ))}
          <AddOrderButton />
        </div>
    </Layout>
  );
}