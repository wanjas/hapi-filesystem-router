import Hapi from '@hapi/hapi';

const route: Omit<Hapi.ServerRoute, 'method' | 'path'> = {
  handler: async (request, h) => {
    const { id } = request.params;
    return {
      id,
      title: 'Cool item',
    };
  },
};

export default route;
