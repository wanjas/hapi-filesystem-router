import Joi from '@hapi/joi';

const route = {
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
