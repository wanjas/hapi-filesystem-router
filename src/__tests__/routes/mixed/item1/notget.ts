import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';

const route: Omit<Hapi.ServerRoute, 'method' | 'path'> = {
  options: {
    validate: {
      payload: Joi.object({}),
    },
  },
  handler: async (request, h) => {
    // work
  },
};

export default route;
