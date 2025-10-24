
export enum RouteId {
  Oeiras = 'oeiras',
  Lisboa = 'lisboa',
  Amadora = 'amadora',
}

export interface Delivery {
  id: string;
  clientName: string;
  address: string;
  cartons: number;
  isCompleted: boolean;
  createdAt: number;
}

export interface Route {
  id: RouteId;
  name: string;
  deliveries: Delivery[];
}

export type Routes = Record<RouteId, Route>;