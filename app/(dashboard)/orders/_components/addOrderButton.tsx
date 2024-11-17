import React from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

const AddOrderButton: React.FC = () => {
  return (
    <button className="p-4 bg-gray-400 dark:bg-darkModeBgbutton rounded-lg shadow-md flex items-center justify-center space-y-2 transition-all duration-300 transform hover:bg-gray-600 hover:scale-105 hover:shadow-lg cursor-pointer">
      <PlusIcon className="h-12 w-12 text-white" /> 
    </button>
  );
};

export default AddOrderButton;

