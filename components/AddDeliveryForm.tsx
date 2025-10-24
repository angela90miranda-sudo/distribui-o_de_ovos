
import React, { useState, useEffect } from 'react';
import { type Delivery } from '../types';

interface AddDeliveryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDelivery: (newDelivery: Omit<Delivery, 'id' | 'isCompleted'>) => void;
}

const AddDeliveryForm: React.FC<AddDeliveryFormProps> = ({ isOpen, onClose, onAddDelivery }) => {
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [cartons, setCartons] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      // Reset form when closed
      setClientName('');
      setAddress('');
      setCartons('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cartonsNum = parseInt(cartons, 10);
    if (!clientName.trim() || !address.trim() || !cartons) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    if (isNaN(cartonsNum) || cartonsNum <= 0) {
      setError('O número de caixas deve ser um número positivo.');
      return;
    }

    // FIX: Added `createdAt` property to satisfy the type Omit<Delivery, 'id' | 'isCompleted'>.
    // Also trimming clientName and address.
    onAddDelivery({ clientName: clientName.trim(), address: address.trim(), cartons: cartonsNum, createdAt: Date.now() });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-brand-brown mb-4">Nova Entrega</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Nome do Cliente</label>
            <input
              type="text"
              id="clientName"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Morada</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="cartons" className="block text-sm font-medium text-gray-700">Nº de Caixas</label>
            <input
              type="number"
              id="cartons"
              value={cartons}
              onChange={e => setCartons(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-brand-brown text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Adicionar Entrega
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeliveryForm;