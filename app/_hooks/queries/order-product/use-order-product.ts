import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { IOrderProduct, IProduct,IAddOrderProduct } from "@/app/_types";
import { QUERY_ORDER_PRODUCTS, QUERY_PRODUCTS,MUTATION_ADD_ORDER_PRODUCT,QUERY_ORDERS } from "@/app/_constants";

export function useOrderProduct() {
  const queryClient = useQueryClient();

  const getOrderProducts = (orderId: number | string) =>
    useQuery<IOrderProduct[], Error>({
      queryKey: [QUERY_ORDER_PRODUCTS, orderId],
      queryFn: async () => {
        if (!orderId) throw new Error("Se requiere un ID de pedido para obtener los productos.");
        try {
          const { data } = await axios.get(`http://localhost:8000/api/order-product/${orderId}`);
          return data.orderProduct;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Error al obtener productos del pedido.");
          } else {
            toast.error("Error desconocido al obtener productos.");
          }
          throw error;
        }
      },
    });
    const addOrderProduct = useMutation<IOrderProduct[], Error, IAddOrderProduct>({
      mutationKey: [MUTATION_ADD_ORDER_PRODUCT],
      mutationFn: async (newOrderProduct) => {
        if (!newOrderProduct.order_id || !newOrderProduct.products || newOrderProduct.products.length === 0) {
          toast.error("Faltan datos importantes para agregar productos al pedido.");
          throw new Error("Faltan datos importantes.");
        }
  
        console.log("Datos de los productos a agregar:", newOrderProduct); 
  
        try {
          const { data } = await axios.post("http://localhost:8000/api/order-product", newOrderProduct);
          console.log("Data de productos : "+data.data)
          return data; 
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Error al añadir productos.");
          } else {
            toast.error("Error desconocido al añadir productos.");
          }
          throw error;
        }
      },
      onSuccess: () => {
        toast.success("Productos añadidos exitosamente al pedido.");
        queryClient.invalidateQueries({ queryKey: [QUERY_ORDER_PRODUCTS] });
        queryClient.invalidateQueries({ queryKey: [QUERY_ORDERS] });
      },
    }); 

  const getProducts = () =>
    useQuery<IProduct[], Error>({
      queryKey: [QUERY_PRODUCTS],
      queryFn: async () => {
        try {
          const { data } = await axios.get("http://localhost:8000/api/products");
          return data.products;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Error al obtener la lista de productos.");
          } else {
            toast.error("Error desconocido al obtener productos.");
          }
          throw error;
        }
      },
    });
    

  return { getOrderProducts, getProducts, addOrderProduct };
}
