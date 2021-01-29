import type Hapi from '@hapi/hapi';

export type RouteModule = Omit<Hapi.ServerRoute, 'method' | 'path'>;
