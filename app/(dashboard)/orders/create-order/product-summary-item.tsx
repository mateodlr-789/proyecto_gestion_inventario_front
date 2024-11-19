import React from "react";
import { SelectedProduct } from "@/app/_types";

interface ProductSummaryItemProps {
  product: SelectedProduct;
}

const ProductSummaryItem: React.FC<ProductSummaryItemProps> = ({ product }) => (
  <div className="flex justify-between">
    <span>{product.name}</span>
    <span>{product.quantity}</span>
    <span>${product.price * product.quantity}</span>
  </div>
);

export default ProductSummaryItem;
