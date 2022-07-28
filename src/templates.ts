import { Util } from '@hapi/hapi';
import path from 'path';
import pMap from 'p-map';
import HTTP_METHODS_PARTIAL_LOWERCASE = Util.HTTP_METHODS_PARTIAL_LOWERCASE;

export interface RouteTemplate {
  method: HTTP_METHODS_PARTIAL_LOWERCASE;
  requirePath: string;
  route: string;
}

const methods = ['get', 'post', 'put', 'patch', 'delete', 'options'];

function isHttpMethod(str): str is HTTP_METHODS_PARTIAL_LOWERCASE {
  return methods.includes(str);
}

export async function composeRouteTemplate(
  filePath: string,
): Promise<RouteTemplate | null> {
  const info = path.parse(filePath);

  if (['.ts', '.js'].includes(info.ext)) {
    if (isHttpMethod(info.name)) {
      return {
        requirePath: `.${path.sep}${info.dir ? path.join(info.dir, info.name) : info.name}`,
        method: info.name,
        route: `/${info.dir.split(path.sep).join('/')}`,
      };
    }
  }

  return null;
}

export async function composeRouteTemplates(
  filesList: string[],
): Promise<RouteTemplate[]> {
  const templates = await pMap(filesList, composeRouteTemplate, {
    concurrency: 1,
  });

  return templates.filter((v) => !!v);
}
