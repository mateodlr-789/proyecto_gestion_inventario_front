"use client";

import React, { useEffect, useState } from "react";
import { useOrder } from "@/app/_hooks/queries/orders/use-orders";
import { SelectedProduct, IOrder, IProduct } from "@/app/_types";
import axios from "axios";

export default function KitchenDashboard() {
  const { getOrders } = useOrder(); 
  const { data: orders, isLoading: ordersLoading, isError: ordersError } = getOrders; 

  const [orderProducts, setOrderProducts] = useState<Record<number, SelectedProduct[]>>({}); 
  const [allProducts, setAllProducts] = useState<any[]>([]); 
  const [hiddenOrders, setHiddenOrders] = useState<number[]>([]); 

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/product"); 
        setAllProducts(response.data.data || []);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchOrderProducts = async () => {
      if (!orders || orders.length === 0 || !allProducts.length) return;

      const productsByOrder: Record<number, SelectedProduct[]> = {};

      for (const order of orders) {
        try {
          const { data } = await axios.get(
            `http://localhost:8000/api/order-product/${order.id}`
          );

          const formattedProducts = data.orderProduct?.map((orderProduct: any) => {
            const productDetails = allProducts.find(
              (product) => product.id === orderProduct.product_id
            );

            if (productDetails) {
              return {
                id: productDetails.id,
                name: productDetails.name || "Sin nombre",
                quantity: orderProduct.total,
                price: productDetails.price || 0,
                createdAt: orderProduct.createdAt || new Date().toISOString(),
                image_url: productDetails.image_url || "",
              };
            } else {
              console.warn(`Producto con ID ${orderProduct.product_id} no encontrado.`);
              return null;
            }
          });

          productsByOrder[order.id] = formattedProducts.filter(
            (product: IProduct) => product !== null
          ) as SelectedProduct[];
        } catch (error) {
          console.error(`Error al cargar productos para la orden ${order.id}:`, error);
        }
      }

      setOrderProducts(productsByOrder);
    };

    fetchOrderProducts();
  }, [orders, allProducts]);

  const handleOrderComplete = (orderId: number) => {
    setHiddenOrders((prev) => [...prev, orderId]);
  };

  if (ordersLoading) return <p>Cargando órdenes...</p>;
  if (ordersError) return <p>Error al cargar los pedidos.</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {orders
        ?.filter((order: IOrder) => !hiddenOrders.includes(order.id)) 
        .map((order: IOrder) => (
          <div
            key={order.id}
            className="bg-black text-gray-200 shadow-md rounded-lg p-4 flex flex-col justify-between  dark:bg-darkModeBgOverlay hover:bg-gray-700 hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            <div>
              <div className="text-xl  font-bold text-center">Mesa {order.tableNumber}</div>
              <hr className="my-2 border-gray-600" />
              <div className="text-sm text-gray-400">
                ID Mesero: 1
              </div>
              <div className="text-sm text-gray-400">
                Creado: {new Date(order.createdAt).toLocaleTimeString()}
              </div>

              <div className="mt-4 space-y-1">
                {orderProducts[order.id] && orderProducts[order.id].length > 0 ? (
                  orderProducts[order.id]?.map((product) => (
                    <div key={product.id} className="text-sm">
                      {product.name} <span className="font-bold">x{product.quantity}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">Cargando productos...</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => handleOrderComplete(order.id)}
                className="w-full bg-darkModeBgOrange hover:bg-gray-600 text-white py-2 rounded-md text-center"
              >
                Orden lista
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
