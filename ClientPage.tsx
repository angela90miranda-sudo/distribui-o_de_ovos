import React, { useState } from 'react';
import { RouteId, type Delivery } from './types';
import { getRoutes, saveRoutes } from './services/storage';
import Header from './components/Header';
import { CheckIcon } from './components/icons/CheckIcon';

const INITIAL_FORM_STATE = {
  clientName: '',
  address: '',
  cartons: '',
};

const ClientPage: React.FC = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [selectedRouteId, setSelectedRouteId] = useState<RouteId>(RouteId.Oeiras);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const { clientName, address, cartons } = formData;
    const cartonsNum = parseInt(cartons, 10);

    if (isNaN(cartonsNum) || cartonsNum <= 0) {
      setError('O número de caixas deve ser um número positivo.');
      return;
    }

    const newDelivery: Delivery = {
      id: `delivery-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      clientName: clientName.trim(),
      address: address.trim(),
      cartons: cartonsNum,
      isCompleted: false,
      createdAt: Date.now(),
    };

    try {
        const currentRoutes = getRoutes();
        const updatedDeliveries = [...currentRoutes[selectedRouteId].deliveries, newDelivery];
        const newRoutes = {
            ...currentRoutes,
            [selectedRouteId]: { ...currentRoutes[selectedRouteId], deliveries: updatedDeliveries },
        };

        saveRoutes(newRoutes);

        // Reset form and show success message
        setFormData(INITIAL_FORM_STATE);
        setSelectedRouteId(RouteId.Oeiras);
        setSuccessMessage('O seu pedido foi registado com sucesso!');

        // Hide success message after a few seconds
        setTimeout(() => setSuccessMessage(''), 4000);
    } catch (e) {
        console.error("Failed to save new delivery:", e);
        setError("Ocorreu um erro ao guardar o seu pedido. Por favor, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-brand-brown font-sans">
      <Header title="Faça o seu Pedido de Ovos" />
      <main className="container mx-auto p-4 flex justify-center">
        <div className="w-full max-w-lg mt-8">
            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-brand-brown mb-6 text-center">Formulário de Pedido</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">O seu Nome</label>
                    <input
                      type="text"
                      id="clientName"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm"
                      required
                      aria-describedby="error-message success-message"
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Morada de Entrega</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm"
                      required
                      aria-describedby="error-message success-message"
                    />
                </div>
                <div>
                    <label htmlFor="cartons" className="block text-sm font-medium text-gray-700">Nº de Caixas</label>
                    <input
                      type="number"
                      id="cartons"
                      name="cartons"
                      min="1"
                      value={formData.cartons}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm"
                      required
                      aria-describedby="error-message success-message"
                    />
                </div>
                <div>
                    <label htmlFor="route" className="block text-sm font-medium text-gray-700">Zona de Entrega</label>
                    <select
                        id="route"
                        name="route"
                        value={selectedRouteId}
                        onChange={e => setSelectedRouteId(e.target.value as RouteId)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm"
                    >
                        <option value={RouteId.Oeiras}>Oeiras</option>
                        <option value={RouteId.Lisboa}>Lisboa</option>
                        <option value={RouteId.Amadora}>Amadora</option>
                    </select>
                </div>

                {error && <p id="error-message" role="alert" className="text-red-600 text-sm font-medium text-center bg-red-50 p-3 rounded-md">{error}</p>}
                
                {successMessage && (
                  <div id="success-message" role="status" className="flex items-center justify-center bg-green-50 p-3 rounded-md text-green-700 font-medium transition-opacity duration-300">
                    <CheckIcon className="w-5 h-5 mr-2"/>
                    <span>{successMessage}</span>
                  </div>
                )}


                <div className="pt-4">
                    <button
                    type="submit"
                    className="w-full px-4 py-3 bg-brand-brown text-white font-bold rounded-md hover:bg-opacity-90 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-brown"
                    >
                    Enviar Pedido
                    </button>
                </div>
                </form>
            </div>
        </div>
      </main>
    </div>
  );
};

export default ClientPage;