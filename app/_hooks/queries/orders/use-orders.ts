"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { IOrder, ICreateOrder, IDeleteOrder } from "@/app/_types"; 
import { QUERY_ORDERS, MUTATION_CREATE_ORDER, MUTATION_DELETE_ORDER } from "@/app/_constants"; 

export function useOrder() {
  const queryClient = useQueryClient();

 
  const getOrders = useQuery<IOrder[], Error>({
    queryKey: [QUERY_ORDERS],
    queryFn: async () => {
      console.log("Iniciando solicitud para obtener órdenes..."); 
      
      try {
        const { data } = await axios.get('http://localhost:8000/api/order');
        
        console.log("Respuesta recibida de la API:", data); 
        
        const formattedOrders = data.order.map((order: any) => ({
          id: order.id,
          tableNumber: order.name, 
          status: "pending", 
          createdAt: order.createdAt,
        }));
        
        console.log("Órdenes formateadas:", formattedOrders); 
        return formattedOrders; 
        
      } catch (error) {
        console.log("Error al obtener las órdenes:", error); 
        
        if (axios.isAxiosError(error)) {
          toast.error(error?.response?.data?.message || "Error al obtener las órdenes.");
        } else {
          toast.error("Error desconocido al obtener las órdenes.");
        }
        throw error; 
      }
    }
  });


  const createOrder = useMutation<IOrder, Error, ICreateOrder>({
    mutationKey: [MUTATION_CREATE_ORDER],
    mutationFn: async (newOrder) => {
      try {
        const { data } = await axios.post("/api/order", newOrder);
        return data; 
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error?.response?.data?.message || "Error al crear la orden.");
        } else {
          toast.error("Error desconocido al crear la orden.");
        }
        throw error; 
      }
    },
    onSuccess: () => {
      toast.success("Orden creada exitosamente.");
      queryClient.invalidateQueries({ queryKey: [QUERY_ORDERS] });
    }
  });

  
  const deleteOrder = useMutation<void, Error, IDeleteOrder>({
    mutationKey: [MUTATION_DELETE_ORDER],
    mutationFn: async ({ id }) => {
      try {
        await axios.delete(`/api/orders/${id}`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error?.response?.data?.message || "Error al eliminar la orden.");
        } else {
          toast.error("Error desconocido al eliminar la orden.");
        }
        throw error; 
      }
    },
    onSuccess: () => {
      toast.success("Orden eliminada exitosamente.");
      queryClient.invalidateQueries({ queryKey: [QUERY_ORDERS] });
    }
  });

  return { getOrders, createOrder, deleteOrder };
}

