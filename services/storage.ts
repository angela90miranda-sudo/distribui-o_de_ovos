import { RouteId, type Routes } from '../types';

const STORAGE_KEY = 'eggDeliveryRoutes';

const ONE_DAY_AGO = Date.now() - 1000 * 60 * 60 * 24;

const INITIAL_ROUTES: Routes = {
  [RouteId.Oeiras]: {
    id: RouteId.Oeiras,
    name: 'Oeiras',
    deliveries: [
      { id: 'oe1', clientName: 'Café Central', address: 'Rua do Marquês, 123', cartons: 5, isCompleted: true, createdAt: ONE_DAY_AGO },
      { id: 'oe2', clientName: 'Pastelaria Doce', address: 'Av. da República, 45', cartons: 8, isCompleted: false, createdAt: ONE_DAY_AGO },
    ],
  },
  [RouteId.Lisboa]: {
    id: RouteId.Lisboa,
    name: 'Lisboa',
    deliveries: [
      { id: 'lx1', clientName: 'Mercearia do Bairro', address: 'Calçada do Combro, 7', cartons: 12, isCompleted: false, createdAt: ONE_DAY_AGO },
      { id: 'lx2', clientName: 'Restaurante Típico', address: 'Rua dos Bacalhoeiros, 101', cartons: 15, isCompleted: false, createdAt: ONE_DAY_AGO },
      { id: 'lx3', clientName: 'Hotel Mundial', address: 'Praça Martim Moniz, 2', cartons: 25, isCompleted: true, createdAt: ONE_DAY_AGO },
    ],
  },
  [RouteId.Amadora]: {
    id: RouteId.Amadora,
    name: 'Amadora',
    deliveries: [
        { id: 'am1', clientName: 'Supermercado Preço Baixo', address: 'Estrada da Falagueira, 200', cartons: 30, isCompleted: false, createdAt: ONE_DAY_AGO },
    ],
  },
};


export const getRoutes = (): Routes => {
  try {
    const storedRoutes = localStorage.getItem(STORAGE_KEY);
    if (storedRoutes) {
      // Adicionar `createdAt` a dados antigos, se necessário
      const parsedRoutes: Routes = JSON.parse(storedRoutes);
      Object.values(parsedRoutes).forEach(route => {
        route.deliveries.forEach(delivery => {
          if (!delivery.createdAt) {
            delivery.createdAt = ONE_DAY_AGO;
          }
        });
      });
      return parsedRoutes;
    }
  } catch (error) {
    console.error("Failed to parse routes from localStorage", error);
  }
  // If nothing is stored, initialize with default data and save it
  saveRoutes(INITIAL_ROUTES);
  return INITIAL_ROUTES;
};

export const saveRoutes = (routes: Routes): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routes));
  } catch (error) {
    console.error("Failed to save routes to localStorage", error);
  }
};