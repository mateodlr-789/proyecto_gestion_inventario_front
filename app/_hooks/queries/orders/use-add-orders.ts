"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { IOrder, ICreateOrder } from "@/app/_types";
import { MUTATION_CREATE_ORDER, QUERY_ORDERS } from "@/app/_constants";

export function useAddOrder() {
  const queryClient = useQueryClient();

  const addOrder = useMutation<IOrder, Error, ICreateOrder>({
    mutationKey: [MUTATION_CREATE_ORDER],
    mutationFn: async (newOrder) => {
      if (!newOrder.user_id || !newOrder.name || !newOrder.types_id) {
        toast.error("Faltan datos importantes para crear el pedido.");
        throw new Error("Faltan datos importantes.");
      }

      console.log("Datos del pedido:", newOrder); 

      try {
        const { data } = await axios.post("http://localhost:8000/api/order", newOrder);
        return data.data;
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

  return { addOrder };
}

