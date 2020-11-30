import Hapi from '@hapi/hapi';

const route: Omit<Hapi.ServerRoute, 'method' | 'path'> = {
  handler: async (request, h) => {
    return 'Greetings, traveler!';
  },
};

export default route;
