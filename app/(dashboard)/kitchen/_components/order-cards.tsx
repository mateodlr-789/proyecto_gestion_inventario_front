"use client"
import React from 'react';
import type { Order } from './kitchen-orders';


interface OrderCardProps {
    order: Order;
    onOrderReady: (tableName: string) => void;
}


const OrderCard = ({ order, onOrderReady }: OrderCardProps) => {
    const { name, createdAt, products } = order;
    return (
        <div className="order-card">
            <h3 className='text-black'>Mesa: {name}</h3>
            <p className='text-black'>Creado: {new Date(createdAt).toLocaleString()}</p>
            <h4 className='text-black'>Productos:</h4>
            <ul>
                {products.map((product, index) => (
                    <li key={index} className='text-black'>
                        {product.name} - Cantidad: {product.total}
                    </li>
                ))}
            </ul>
            <button onClick={() => onOrderReady(name)}>Pedido Listo</button>
        </div>
    );
};

export default OrderCard;
