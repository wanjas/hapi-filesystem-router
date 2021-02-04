import Hapi from '@hapi/hapi';
import pMap from 'p-map';
import path from 'path';
import { RouteModule } from './module';
import { getFilesList, isReadable, toAbsolutePath } from './files';
import { composeRouteTemplates } from './templates';

export { RouteModule, FSRM } from './module';

export async function attachRoutes(
  server: Hapi.Server,
  rootPath = 'routes',
  routePrefix?: string,
  defaultParams: RouteModule = {},
): Promise<void> {
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
      const module = (await import(path.resolve(rootPath, requirePath))) as {
        default: RouteModule;
      };

      if (
        typeof defaultParams.options === 'function' ||
        typeof module.default.options === 'function'
      ) {
        throw new Error("Can't handle function as options yet");
      }
      const mergedOptions = {
        ...defaultParams.options,
        ...module.default.options,
      };

      server.route({
        // TODO create more sophisticated merge
        // (some stuff can be both functions or objects and probably only one level deep merge needed)
        ...defaultParams,
        ...module.default,
        options: mergedOptions,
        method,
        path: routePrefix ? `/${routePrefix}${route}` : route,
      });
    },
    { concurrency: 1 },
  );
}
