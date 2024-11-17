"use client"
import React, { useState, useEffect } from 'react';
import OrderCard from './order-cards';
import { http } from '@/app/_hooks/axios';


export interface Order {
    id: number
    name: string
    createdAt: string
    products: Product[]
  }
  
  export interface Product {
    name: string
    total: number
  }

const KitchenOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);


    const fetchOrders = async () => {
        try {
            const response = await http("ORDER").get('/products');
            //const data: Order[] = await response.json();
            setOrders(response.data);
            console.log(response)
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };


    const handleOrderReady = async (tableNumber: string) => {
        console.log("hllo worlkd")
    };


    return (
        <div className="kitchen-orders">
            <h1 className='text-black'>Pedidos</h1>
            <div className="order-grid">
                {orders ? orders.map((order, index) => (
                    <OrderCard
                    key={index}
                    order={order}
                    onOrderReady={handleOrderReady}
                />
                )) : null}
            </div>
        </div>
    );
};

export default KitchenOrders;
