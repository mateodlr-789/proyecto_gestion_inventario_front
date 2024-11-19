import React from "react";
import ProductSummaryItem from "./product-summary-item";
import { SelectedProduct } from "@/app/_types";

interface ProductSummaryProps {
  products: SelectedProduct[];
  total: number;
}

const ProductSummary: React.FC<ProductSummaryProps> = ({ products, total }) => (
  <div className="w-1/3 border-l pl-4">
    <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
    {products.length === 0 ? (
      <p>No hay productos en el pedido.</p>
    ) : (
      <div>
        {products.map((product) => (
          <ProductSummaryItem key={product.id} product={product} />
        ))}
        <div className="mt-4 font-bold text-lg">Total: ${total.toFixed(2)}</div>
      </div>
    )}
  </div>
);


export default ProductSummary;