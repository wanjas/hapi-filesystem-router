import Joi from 'joi';
import { FSRM, RouteModule } from '../../../../../module';

const route: FSRM = {
  options: {
    validate: {
      payload: Joi.object({}),
    },
  },
  handler: async (request, h) => {
    // nothing
  },
};

export default route;
