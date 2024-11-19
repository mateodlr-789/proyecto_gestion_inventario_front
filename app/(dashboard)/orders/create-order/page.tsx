"use client";

import React, { useState, useEffect } from "react";
import ProductList from "./product-list";
import ProductSummary from "./product-summary";
import AddProductBtn from "./add-product-btn";
import { SelectedProduct } from "@/app/_types";
import { useSearchParams } from "next/navigation";
import { useOrderProduct, useProduct } from "@/app/_hooks";
import ProductModal from "./product-modal";
import ConfirmOrderButton from "./confirm-order-btn";

export default function Page() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId"); 
  const [products, setProducts] = useState<SelectedProduct[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [tableName, setTableName] = useState<string>("");

  const { getOrderProducts } = useOrderProduct();
  const { data: orderProducts, isLoading, isError } = getOrderProducts(orderId || "");

  const { getProducts } = useProduct();
  const { data: allProducts } = getProducts;

  useEffect(() => {
    const table = searchParams.get("tableName");
    if (table) {
      setTableName(table);
    }
  }, [searchParams]);

  useEffect(() => {
    if (orderProducts && allProducts) {
      const formattedProducts = orderProducts.map((orderProduct) => {
        const productDetails = allProducts.find(
          (product) => product.id === orderProduct.product_id
        );

        if (productDetails) {
          return {
            id: productDetails.id,
            name: productDetails.name,
            price: productDetails.price,
            quantity: orderProduct.total, 
            createdAt: orderProduct.createdAt,
            image_url: productDetails.image_url,
          };
        } else {
          console.warn(`Producto con ID ${orderProduct.product_id} no encontrado.`);
          return null;
        }
      });

      const validProducts = formattedProducts.filter((prod) => prod !== null) as SelectedProduct[];

      setProducts(validProducts);
      setTotal(validProducts.reduce((sum, prod) => sum + prod.price * prod.quantity, 0));
    }
  }, [orderProducts, allProducts]);

  const handleAddProduct = (newProduct: SelectedProduct) => {
    const existingProductIndex = products.findIndex((product) => product.id === newProduct.id);

    if (existingProductIndex !== -1) {
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex].quantity = newProduct.quantity; 
      setProducts(updatedProducts);
      setTotal(updatedProducts.reduce((sum, prod) => sum + prod.price * prod.quantity, 0));
    } else {
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setTotal((prevTotal) => prevTotal + newProduct.price * newProduct.quantity);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-darkModebg flex flex-col relative">
      <header className="w-full bg-orange-500 dark:bg-darkModeBgOverlay text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Crear Pedido</h1>
        <button className="text-white">Logout</button>
      </header>

      <div className="mt-4 text-center">
        <h1 className="text-2xl font-bold">Mesa: {tableName}</h1>
      </div>

      <div className="flex-grow flex flex-col mt-6 space-y-6 px-4 pb-20">
        <div className="flex flex-grow space-x-4">
          <ProductList products={products} />

          <ProductSummary products={products} total={total} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4 z-10">
        <div className="w-1/4 bg-white dark:bg-darkModeBgOverlay shadow-lg rounded-lg px-6 py-4">
          <div className="flex justify-center space-x-4">
            <AddProductBtn onAddProduct={handleAddProduct} products={products} setTotal={setTotal} />

            <ConfirmOrderButton tableNumber={tableName} products={products} existingOrderId={orderId ? parseInt(orderId) : undefined} />
          </div>
        </div>
      </div>
    </div>
  );
}
