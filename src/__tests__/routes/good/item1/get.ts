import Hapi from '@hapi/hapi';
import Joi from 'joi';
import { RouteModule } from '../../../../module';

const route: RouteModule<
  { id: string },
  { a1: string; a2: number },
  { email: string; id: string },
  { q: string }
> = {
  options: {
    validate: {
      payload: Joi.object({}),
    },
  },
  handler: async (request, h) => {
    const {
      credentials: {
        app,
        scope,
        user: { email, id },
      },
    } = request.auth;
    const {
      payload: { a1, a2 },
    } = request;

    const { id: idFromParams } = request.params;
    const { q } = request.query;
  },
};

export default route;
