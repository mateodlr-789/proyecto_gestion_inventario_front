import React from "react";
import { SelectedProduct } from "@/app/_types";

interface ProductItemProps {
  product: SelectedProduct;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => (
  <div className="flex items-center space-x-4 border-b p-2">
    <img
      src={product.image_url || "/placeholder.png"}
      alt={product.name}
      className="w-[150px] h-[150px] object-cover rounded"
    />
    <div className="flex-grow">
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-sm text-gray-500">Cantidad: {product.quantity}</p>
    </div>
    <span className="font-bold">${(product.price * product.quantity).toFixed(2)}</span>
  </div>
);


export default ProductItem;
