import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { RouteId, type Routes } from './types';
import Header from './components/Header';
import RouteTabs from './components/RouteTabs';
import RouteSummary from './components/RouteSummary';
import DeliveryList from './components/DeliveryList';
import { getRoutes, saveRoutes } from './services/storage';

const App: React.FC = () => {
  const [routes, setRoutes] = useState<Routes>(() => getRoutes());
  const [selectedRouteId, setSelectedRouteId] = useState<RouteId>(RouteId.Oeiras);

  const selectedRoute = useMemo(() => routes[selectedRouteId], [routes, selectedRouteId]);

  // Efeito para sincronizar com o localStorage se outra aba o modificar
  useEffect(() => {
    const handleStorageChange = () => {
      setRoutes(getRoutes());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleSelectRoute = useCallback((routeId: RouteId) => {
    setSelectedRouteId(routeId);
  }, []);

  const handleToggleComplete = useCallback((deliveryId: string) => {
    setRoutes(prevRoutes => {
      const newDeliveries = prevRoutes[selectedRouteId].deliveries.map(d =>
        d.id === deliveryId ? { ...d, isCompleted: !d.isCompleted } : d
      );
      const newRoutes = {
        ...prevRoutes,
        [selectedRouteId]: { ...prevRoutes[selectedRouteId], deliveries: newDeliveries },
      };
      saveRoutes(newRoutes);
      return newRoutes;
    });
  }, [selectedRouteId]);

  const handleDeleteDelivery = useCallback((deliveryId: string) => {
    setRoutes(prevRoutes => {
      const newDeliveries = prevRoutes[selectedRouteId].deliveries.filter(d => d.id !== deliveryId);
      const newRoutes = {
        ...prevRoutes,
        [selectedRouteId]: { ...prevRoutes[selectedRouteId], deliveries: newDeliveries },
      };
      saveRoutes(newRoutes);
      return newRoutes;
    });
  }, [selectedRouteId]);
  
  return (
    <div className="min-h-screen bg-gray-50 text-brand-brown font-sans">
      <Header title="Gestor de Rotas de Ovos" />
      <main className="container mx-auto p-4 pb-24">
        <RouteTabs
          routes={Object.values(routes)}
          selectedRouteId={selectedRouteId}
          onSelectRoute={handleSelectRoute}
        />
        <div className="mt-6 space-y-6">
          <RouteSummary route={selectedRoute} />
          <DeliveryList
            deliveries={selectedRoute.deliveries}
            onToggleComplete={handleToggleComplete}
            onDeleteDelivery={handleDeleteDelivery}
          />
        </div>
      </main>
    </div>
  );
};

export default App;