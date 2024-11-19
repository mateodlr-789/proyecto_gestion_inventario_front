"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { IProduct, ICreateProduct, IDeleteProduct } from "@/app/_types"; 
import { QUERY_PRODUCTS, MUTATION_CREATE_PRODUCT, MUTATION_DELETE_PRODUCT } from "@/app/_constants"; 

export function useProduct() {
  const queryClient = useQueryClient();

  const getProducts = useQuery<IProduct[], Error>({
    queryKey: [QUERY_PRODUCTS],
    queryFn: async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/product");
        return data.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error?.response?.data?.message || "Error al obtener los productos.");
        } else {
          toast.error("Error desconocido al obtener los productos.");
        }
        throw error;
      }
    }
  });

  const createProduct = useMutation<IProduct, Error, ICreateProduct>({
    mutationKey: [MUTATION_CREATE_PRODUCT],
    mutationFn: async (newProduct) => {
      try {
        const { data } = await axios.post("/api/product", newProduct);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error?.response?.data?.message || "Error al crear el producto.");
        } else {
          toast.error("Error desconocido al crear el producto.");
        }
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Producto creado exitosamente.");
      queryClient.invalidateQueries({ queryKey: [QUERY_PRODUCTS] });
    }
  });

  const deleteProduct = useMutation<void, Error, IDeleteProduct>({
    mutationKey: [MUTATION_DELETE_PRODUCT],
    mutationFn: async ({ id }) => {
      try {
        await axios.delete(`/api/products/${id}`);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error?.response?.data?.message || "Error al eliminar el producto.");
        } else {
          toast.error("Error desconocido al eliminar el producto.");
        }
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Producto eliminado exitosamente.");
      queryClient.invalidateQueries({ queryKey: [QUERY_PRODUCTS] });
    }
  });

  return { getProducts, createProduct, deleteProduct };
}

