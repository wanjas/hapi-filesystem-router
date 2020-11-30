import Hapi from '@hapi/hapi';
import Joi from '@hapi/joi';

const route: Omit<Hapi.ServerRoute, 'method' | 'path'> = {
  options: {
    validate: {
      payload: Joi.object({
        title: Joi.string().length(255),
      }),
    },
  },
  handler: async (request, h) => {
    const { title } = request.payload as any;
    const { id } = request.params;
    return {
      id,
      title,
      updatedAt: new Date().toISOString(),
      privateData: "You'd better not to share that",
    };
  },
};

export default route;
