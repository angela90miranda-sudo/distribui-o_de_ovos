
import React, { useMemo } from 'react';
import { type Route } from '../types';

interface RouteSummaryProps {
  route: Route;
}

const RouteSummary: React.FC<RouteSummaryProps> = ({ route }) => {
  const stats = useMemo(() => {
    const totalStops = route.deliveries.length;
    const completedStops = route.deliveries.filter(d => d.isCompleted).length;
    const pendingStops = totalStops - completedStops;
    const totalCartons = route.deliveries.reduce((sum, d) => sum + d.cartons, 0);
    return { totalStops, completedStops, pendingStops, totalCartons };
  }, [route.deliveries]);

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-xl font-bold text-brand-brown mb-4 border-b pb-2">Resumo da Rota: {route.name}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{stats.totalStops}</p>
          <p className="text-sm text-blue-800 font-medium">Paragens Totais</p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-2xl font-bold text-green-600">{stats.completedStops}</p>
          <p className="text-sm text-green-800 font-medium">Concluídas</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="text-2xl font-bold text-yellow-600">{stats.pendingStops}</p>
          <p className="text-sm text-yellow-800 font-medium">Pendentes</p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">{stats.totalCartons}</p>
          <p className="text-sm text-purple-800 font-medium">Caixas de Ovos</p>
        </div>
      </div>
    </div>
  );
};

export default RouteSummary;
