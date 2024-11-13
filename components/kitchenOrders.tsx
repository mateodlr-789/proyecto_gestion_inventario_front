// components/KitchenOrders.tsx
import React, { useState, useEffect } from 'react';
import OrderCard from './orderCards';

interface Order {
    tableNumber: number;         // Número de mesa del pedido
    products: string[];          // Lista de productos solicitados
}

const KitchenOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);  // Define el estado de pedidos como una lista de objetos `Order`

    // 1. `useEffect` carga los pedidos al inicio
    useEffect(() => {
        fetchOrders();
    }, []);

    // 2. Función para obtener pedidos del backend
    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/orders');  // Llama a la API para obtener los pedidos
            const data: Order[] = await response.json();
            setOrders(data);                             // Guarda los pedidos en el estado `orders`
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // 3. Función para marcar pedido como "Listo"
    const handleOrderReady = async (tableNumber: number) => {
        try {
            await fetch(`/api/orders/${tableNumber}`, {
                method: 'PATCH',                         // Usa el método PATCH para actualizar el estado del pedido
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'ready' })
            });
            setOrders(orders.filter(order => order.tableNumber !== tableNumber));  // Filtra y elimina el pedido listo
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    // 4. Renderiza la lista de pedidos en tarjetas
    return (
        <div className="kitchen-orders">
            <h1>Pedidos</h1>
            <div className="order-grid">
                {orders.map((order) => (
                    <OrderCard
                        key={order.tableNumber}
                        tableNumber={order.tableNumber}
                        products={order.products}
                        onOrderReady={handleOrderReady}
                    />
                ))}
            </div>
        </div>
    );
};

export default KitchenOrders;
