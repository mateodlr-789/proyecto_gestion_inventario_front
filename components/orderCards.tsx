// components/OrderCard.tsx
import React from 'react';

// 1. Define las propiedades que el componente espera recibir.
interface OrderCardProps {
    tableNumber: number;                                // Número de la mesa
    products: string[];                                 // Lista de productos en el pedido
    onOrderReady: (tableNumber: number) => void;        // Función que se llama cuando el pedido se marca como "Listo"
}

// 2. Define el componente `OrderCard` como una función que recibe `OrderCardProps`.
const OrderCard: React.FC<OrderCardProps> = ({ tableNumber, products, onOrderReady }) => {
    return (
        <div className="order-card">
            <h3>Mesa {tableNumber}</h3>                // Muestra el número de mesa
            <ul>
                {products.map((product, index) => (    // Muestra cada producto del pedido en una lista
                    <li key={index}>{product}</li>
                ))}
            </ul>
            <button onClick={() => onOrderReady(tableNumber)}>Pedido Listo</button>  // Llama a `onOrderReady` cuando se hace clic
        </div>
    );
};

export default OrderCard;
