import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';
import Modal from './modal';
import { useRouter } from "next/navigation";
import { route } from "@/app/_constants";

const AddOrderButton: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableName, setTableName] = useState('');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreateOrder = () => {
    router.push(`${route.CreateOrder}?tableName=${tableName}`);
    console.log('Nombre de la mesa:', tableName);
    setTableName('');
    handleCloseModal();
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="p-4 bg-gray-400 dark:bg-darkModeBgbutton rounded-lg shadow-md flex items-center justify-center space-y-2 transition-all duration-300 transform hover:bg-gray-600 hover:scale-105 hover:shadow-lg cursor-pointer"
      >
        <PlusIcon className="h-12 w-12 text-white" /> 
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-orange-500">Crear Nuevo Pedido</h2>
          <input
            type="text"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="Nombre de la mesa"
            className="border p-2 rounded mb-4 w-full dark:bg-darkModeBg text-black"
          />
          <button
            onClick={handleCreateOrder}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-all duration-300"
          >
            Crear Pedido
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AddOrderButton;