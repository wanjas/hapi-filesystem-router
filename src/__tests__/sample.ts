import { RouteTemplate } from '../templates';

export const goodPaths: Record<string, RouteTemplate> = {
  'get.ts': {
    requirePath: `./get`,
    method: 'get',
    route: `/`,
  },
  'item1/get.ts': {
    requirePath: `./item1/get`,
    method: 'get',
    route: `/item1`,
  },
  'item2/get.ts': {
    requirePath: `./item2/get`,
    method: 'get',
    route: `/item2`,
  },
  'item2/item2.1/post.ts': {
    requirePath: `./item2/item2.1/post`,
    method: 'post',
    route: `/item2/item2.1`,
  },
  'item2/item2.2/get.ts': {
    requirePath: `./item2/item2.2/get`,
    method: 'get',
    route: `/item2/item2.2`,
  },
  'item2/item2.2/post.ts': {
    requirePath: `./item2/item2.2/post`,
    method: 'post',
    route: `/item2/item2.2`,
  },
  'item3/get.ts': {
    requirePath: `./item3/get`,
    method: 'get',
    route: `/item3`,
  },
};
