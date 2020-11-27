import Hapi from '@hapi/hapi';
import pMap from 'p-map';
import { RouterModule } from './module';
import { getFilesList, isReadable, toAbsolutePath } from './files';
import { composeRouteTemplates } from './templates';

export async function attachRoutes(rootPath: string, server: Hapi.Server) {
  rootPath = toAbsolutePath(rootPath);
  const rootIsReadable = await isReadable(rootPath);

  if (!rootIsReadable) {
    console.log(`Path [${rootPath}] is not readable.`);
    throw new Error("Can't find paths");
  }

  const filesList = await getFilesList(rootPath);

  const templates = await composeRouteTemplates(filesList);

  await pMap(
    templates,
    async ({ method, requirePath, route }) => {
      const module = (await import(requirePath)) as RouterModule;

      server.route({
        method,
        path: route,
        ...module,
      });
    },
    { concurrency: 1 },
  );
}
