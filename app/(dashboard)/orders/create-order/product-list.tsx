import React from "react";
import ProductItem from "./product-item";
import { SelectedProduct } from "@/app/_types";

interface ProductListProps {
  products: SelectedProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => (
  <div className="w-2/3">
    <h2 className="text-xl font-bold mb-4">Productos en la Mesa</h2>
    {products.length === 0 ? (
      <p>No hay productos en el pedido.</p>
    ) : (
      <div className="space-y-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    )}
  </div>
);


export default ProductList;