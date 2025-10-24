
import React from 'react';
import { type Delivery } from '../types';
import DeliveryItem from './DeliveryItem';

interface DeliveryListProps {
  deliveries: Delivery[];
  onToggleComplete: (deliveryId: string) => void;
  onDeleteDelivery: (deliveryId: string) => void;
}

const DeliveryList: React.FC<DeliveryListProps> = ({ deliveries, onToggleComplete, onDeleteDelivery }) => {
  const sortedDeliveries = [...deliveries].sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted));
    
  return (
    <div>
        <h2 className="text-xl font-bold text-brand-brown mb-4">Entregas</h2>
        {sortedDeliveries.length > 0 ? (
            <div className="space-y-3">
            {sortedDeliveries.map(delivery => (
                <DeliveryItem
                key={delivery.id}
                delivery={delivery}
                onToggleComplete={onToggleComplete}
                onDeleteDelivery={onDeleteDelivery}
                />
            ))}
            </div>
        ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                <p>Nenhuma entrega para esta rota.</p>
                <p className="text-sm mt-1">Os pedidos feitos pelos clientes aparecerão aqui.</p>
            </div>
        )}
    </div>
  );
};

export default DeliveryList;