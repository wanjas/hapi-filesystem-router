import Joi from 'joi';
import { RouterModule } from 'hapi-filesystem-router';

const route: RouterModule = {
  options: {
    validate: {
      payload: Joi.object({
        value: Joi.string(),
      }),
    },
  },
  handler: async (request, h) => {
    const { value } = request.payload as any;
  },
};

export default route;
