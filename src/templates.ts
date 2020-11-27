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

export async function composeRouteTemplate(filePath): Promise<RouteTemplate> {
  const info = path.parse(filePath);

  if (isHttpMethod(info.name)) {
    if (info.ext !== '.ts') {
      console.warn('');
    }

    return {
      requirePath: info.dir ? `./${info.dir}/${info.name}` : `./${info.name}`,
      method: info.name,
      route: `/${info.dir}`,
    };
  }
  return null;
}

export async function composeRouteTemplates(filesList) {
  return pMap(filesList, composeRouteTemplate, { concurrency: 1 });
}
