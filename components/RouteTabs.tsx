
import React from 'react';
import { type Route, RouteId } from '../types';

interface RouteTabsProps {
  routes: Route[];
  selectedRouteId: RouteId;
  onSelectRoute: (routeId: RouteId) => void;
}

const RouteTabs: React.FC<RouteTabsProps> = ({ routes, selectedRouteId, onSelectRoute }) => {
  return (
    <div className="bg-white rounded-lg shadow p-2 flex space-x-2">
      {routes.map(route => {
        const isSelected = route.id === selectedRouteId;
        return (
          <button
            key={route.id}
            onClick={() => onSelectRoute(route.id)}
            className={`w-full py-3 px-4 rounded-md text-center font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-yellow ${
              isSelected
                ? 'bg-brand-brown text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {route.name}
          </button>
        );
      })}
    </div>
  );
};

export default RouteTabs;
