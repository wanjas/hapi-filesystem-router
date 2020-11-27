import Hapi from '@hapi/hapi';

export type RouterModule = Omit<Hapi.ServerRoute, 'method' | 'path'>;
