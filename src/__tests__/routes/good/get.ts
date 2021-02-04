import Joi from 'joi';
import { FSRM } from '../../../module';

const route: FSRM<{
  params: { id: string };

  payload: {
    a1: string;
    a2: number;
  };
  user: { email: string; id: string };
  query: { q: string };
}> = {
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

    const { a1, a2 } = request.payload;

    const { id: idFromParams } = request.params;
    const { q } = request.query;
  },
};

export default route;
