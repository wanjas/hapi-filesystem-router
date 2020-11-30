/* eslint-disable import/no-extraneous-dependencies */
import Hapi from '@hapi/hapi';
import CookieSession from '@hapi/cookie';
import Blipp from 'blipp';
import laabr from 'laabr';
import { attachRoutes } from '../../src';

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3033,
    debug: {
      log: ['*'],
      request: ['*'],
    },
  });

  // Show registered routes
  await server.register({
    plugin: Blipp,
    options: {
      showAuth: true,
      showScope: true,
    },
  });

  // Just a logging
  await server.register({
    plugin: laabr,
    options: {
      colored: true,
    },
  });

  await server.register(CookieSession);
  server.auth.strategy('session', 'cookie', {
    cookie: {
      name: 'sid-example',
      // Don't forget to change it to your own secret password!
      password: 'secret',
      // For working via HTTP in localhost
      isSecure: process.env.NODE_ENV !== 'development',
      isHttpOnly: true,
      path: '/',
    },
    redirectTo: false,
    validateFunc: async (request, session) => {
      // Here should be real validation
      return {
        valid: true,
        credentials: {
          user: 'UserOne',
          scope: ['admin'],
        },
      };
    },
  });

  await attachRoutes(server, 'routes/public');
  await attachRoutes(server, 'routes/private', 'protected', {
    options: {
      auth: {
        scope: ['admin'],
        strategy: 'session',
      },
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log('unhandledRejection!');
  console.log(err);
  process.exit(1);
});

init();
