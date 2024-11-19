"use client";

import React, { useState, useEffect } from "react";
import { IProduct, SelectedProduct } from "@/app/_types";
import { useProduct } from "@/app/_hooks";

interface ProductModalProps {
  onClose: () => void;
  onSelectProducts: (selectedProducts: SelectedProduct[]) => void;
  selectedProducts: SelectedProduct[];
}

const ProductModal: React.FC<ProductModalProps> = ({
  onClose,
  onSelectProducts,
  selectedProducts,
}) => {
  const { getProducts } = useProduct();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [updatedSelectedProducts, setUpdatedSelectedProducts] =
    useState<SelectedProduct[]>([]);

  const filteredProducts =
    getProducts.data?.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  
  useEffect(() => {
    setUpdatedSelectedProducts([]);
  }, []);

  const handleSelectProduct = (product: IProduct) => {
    setUpdatedSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p.id === product.id);
      if (!isSelected) {
        return [...prev, { ...product, quantity: 0 }]; 
      }
      return prev; 
    });
  };
  
  
  const handleQuantityChange = (productId: number, quantity: number) => {
    setUpdatedSelectedProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, quantity } : p))
    );
  };
  
  

  const handleAddToOrder = () => {
    const updatedOrder = [...selectedProducts]; 
  
    updatedSelectedProducts
      .filter((selectedProduct) => selectedProduct.quantity > 0) 
      .forEach((selectedProduct) => {
        const existingProductIndex = updatedOrder.findIndex(
          (p) => p.id === selectedProduct.id
        );
  
        if (existingProductIndex !== -1) {
          updatedOrder[existingProductIndex].quantity += selectedProduct.quantity;
        } else {
          updatedOrder.push(selectedProduct);
        }
      });
  
    onSelectProducts(updatedOrder); 
    onClose(); 
  };
  
  const isProductSelected = (productId: number): boolean => {
    return updatedSelectedProducts.some((p) => p.id === productId);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-darkModeBgOverlay p-6 rounded-lg text-black dark:text-white shadow-lg relative w-3/4 h-3/4 overflow-auto">
        <button
          onClick={() => {
            setUpdatedSelectedProducts([]); 
            onClose();
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>

        <input
          type="text"
          placeholder="Buscar producto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => {
            const selectedProduct = updatedSelectedProducts.find(
              (p) => p.id === product.id
            );
            return (
              <div
                key={product.id}
                className={`border p-4 rounded cursor-pointer ${
                  isProductSelected(product.id) ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSelectProduct(product)}
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-32 object-cover mb-2"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p>Precio: ${product.price}</p>
                <p>Stock: {product.stock}</p>
                {isProductSelected(product.id) && (
                <input
                type="number"
                min="0" 
                value={updatedSelectedProducts.find((p) => p.id === product.id)?.quantity || 0}
                onChange={(e) =>
                  handleQuantityChange(product.id, parseInt(e.target.value) || 0)
                }
                className="mt-2 border p-1 text-black rounded w-full"
              />
                
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={handleAddToOrder}
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-all duration-300"
        >
          Agregar al Pedido
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
