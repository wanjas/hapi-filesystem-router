/* eslint-disable import/no-extraneous-dependencies */
import Hapi from '@hapi/hapi';
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

  await attachRoutes(server);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log('unhandledRejection!');
  console.log(err);
  process.exit(1);
});

init();
