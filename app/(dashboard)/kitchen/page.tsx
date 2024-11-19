"use client"

import KitchenDashboard from './_components/kitchen-orders';
import { Layout } from "./_components/layout";
import { useRouter } from "next/navigation"; 
import { useOrder } from "@/app/_hooks/queries/orders/use-orders";
import { IOrder } from "@/app/_types";

export default function Page() {
  const { getOrders } = useOrder();
  const { data: orders, isLoading, isError } = getOrders;
  const router = useRouter(); 

  const handleSelectOrder = (orderId: number, tableName: string) => {
    
  };

  if (isLoading) return <div>Cargando órdenes...</div>;
  if (isError || !orders || !Array.isArray(orders)) return <div>No hay órdenes disponibles o error al cargar.</div>;

  return (
    <Layout>
      <KitchenDashboard /> 
    </Layout>
  );
}

