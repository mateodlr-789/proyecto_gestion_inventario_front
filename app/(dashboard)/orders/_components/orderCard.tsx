import React from 'react';

interface OrderCardProps {
  tableName: string;
  status: string;
  createdAt: string
}

const OrderCard: React.FC<OrderCardProps> = ({ tableName, status, createdAt }) => {

  const statusColor = status === 'Pendiente de pago'
    ? 'bg-red-500'
    : status === 'Pedido listo'
    ? 'bg-green-500'
    : 'bg-yellow-500 dark:bg-orange-500';


  const formattedDate = new Date(createdAt).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, 
  });

  return (
    <div className="p-4 bg-gray-500 dark:bg-darkModeBgOverlay rounded-lg shadow-md flex flex-col items-center space-y-2 transition-all duration-300 transform hover:bg-gray-700 hover:scale-105 hover:shadow-lg cursor-pointer">
      <h2 className="text-lg text-white font-bold text-center">{tableName}</h2>
      <div className="w-full border-t-2 border-white dark:border-white my-2" />
      <p className={`text-white ${statusColor} rounded-full px-2 py-1`}>{status}</p>
      <p className="text-sm text-white">{formattedDate}</p>
    </div>
  );
};

export default OrderCard;