"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAddOrder, useOrderProduct } from "@/app/_hooks"; 
import { useSession } from "next-auth/react"; 
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode"; 
import { SelectedProduct } from "@/app/_types"; 

interface ConfirmOrderButtonProps {
  tableNumber: string;
  products: SelectedProduct[];
  existingOrderId?: number; 
}

export default function ConfirmOrderButton({ tableNumber, products, existingOrderId }: ConfirmOrderButtonProps) {
  const router = useRouter();
  const { addOrder } = useAddOrder();
  const { addOrderProduct } = useOrderProduct(); 
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmOrder = async () => {
    if (!products.length) {
      return;
    }
    if (!session?.token?.header) {
      toast.error("No se pudo obtener el token de usuario.");
      return;
    }

    try {
      const decodedToken: any = jwtDecode(session.token.header);
      const userId = decodedToken?.uid; 

      if (!userId) {
        toast.error("No se pudo obtener el ID del usuario.");
        return;
      }

      setIsSubmitting(true);

      let newOrderId;
      if (existingOrderId) {
        newOrderId = existingOrderId;
      } else {

        const newOrder = await addOrder.mutateAsync({
          name: tableNumber,
          user_id: parseInt(userId),
          types_id: 9,
        });

        if (!newOrder.id) {
          throw new Error("No se obtuvo el ID de la orden creada.");
        }

        newOrderId = newOrder.id; 
      }

      const productsPayload = products.map((product) => ({
        product_id: product.id,
        total: product.quantity,
      }));

      await addOrderProduct.mutateAsync({
        order_id: newOrderId,
        products: productsPayload,
      });

      toast.success("Pedido creado o actualizado exitosamente.");
    } catch (error) {
      toast.error("Error al crear el pedido o agregar productos.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
      router.push("/orders");

    }
  };

  return (
    <button
      onClick={handleConfirmOrder}
      disabled={isSubmitting || !products.length}
      className={`px-4 py-2 rounded-lg text-white ${
        isSubmitting || !products.length
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {isSubmitting ? "Enviando..." : "Confirmar Pedido"}
    </button>
  );
}