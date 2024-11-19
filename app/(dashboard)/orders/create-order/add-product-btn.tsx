"use client";

import React, { useState } from "react";
import ProductModal from "./product-modal";
import { SelectedProduct } from "@/app/_types";

interface AddProductBtnProps {
  products: SelectedProduct[];
  onAddProduct: (newProduct: SelectedProduct) => void;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}

const AddProductBtn: React.FC<AddProductBtnProps> = ({ products, onAddProduct, setTotal }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSelectProducts = (selectedProducts: SelectedProduct[]) => {
    selectedProducts.forEach((newProduct) => {
      onAddProduct(newProduct); 
    });

    const newTotal = selectedProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotal((prev) => newTotal);

    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-all duration-300"
      >
        Agregar Producto
      </button>
      {isModalOpen && (
        <ProductModal
          onClose={() => setIsModalOpen(false)}
          onSelectProducts={handleSelectProducts}
          selectedProducts={products} 
        />
      )}
    </>
  );
};

export default AddProductBtn;
