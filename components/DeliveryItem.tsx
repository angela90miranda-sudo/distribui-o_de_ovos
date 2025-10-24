
import React, { useState, useEffect } from 'react';
import { type Delivery } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { TrashIcon } from './icons/TrashIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { BoxIcon } from './icons/BoxIcon';

interface DeliveryItemProps {
  delivery: Delivery;
  onToggleComplete: (deliveryId: string) => void;
  onDeleteDelivery: (deliveryId: string) => void;
}

const DeliveryItem: React.FC<DeliveryItemProps> = ({ delivery, onToggleComplete, onDeleteDelivery }) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    // Destaca se o item foi criado nos últimos 5 segundos
    if (Date.now() - delivery.createdAt < 5000) {
      setIsHighlighted(true);
    }
  }, []); // O array de dependências vazio garante que isto só corre quando o componente é montado

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between transition-opacity duration-300 ${delivery.isCompleted ? 'opacity-60 bg-gray-50' : ''} ${isHighlighted ? 'new-delivery-highlight' : ''}`}>
      <div className="flex-grow mb-4 sm:mb-0">
        <h3 className={`font-bold text-lg ${delivery.isCompleted ? 'line-through text-gray-500' : 'text-brand-brown'}`}>
          {delivery.clientName}
        </h3>
        <div className="text-sm text-gray-600 mt-1 flex items-center">
            <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{delivery.address}</span>
        </div>
        <div className="text-sm text-gray-600 mt-1 flex items-center">
            <BoxIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{delivery.cartons} caixas de ovos</span>
        </div>
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        <button
          onClick={() => onToggleComplete(delivery.id)}
          className={`p-2 rounded-full transition-colors ${delivery.isCompleted ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
          aria-label={delivery.isCompleted ? 'Marcar como pendente' : 'Marcar como concluída'}
        >
          <CheckIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDeleteDelivery(delivery.id)}
          className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transition-colors"
          aria-label="Eliminar entrega"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DeliveryItem;