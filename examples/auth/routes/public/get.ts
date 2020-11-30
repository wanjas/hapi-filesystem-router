import Hapi from '@hapi/hapi';

const route: Omit<Hapi.ServerRoute, 'method' | 'path'> = {
  handler: async (request, h) => {
    return "Greetings, traveler! Let's see if you have some coins.";
  },
};

export default route;
