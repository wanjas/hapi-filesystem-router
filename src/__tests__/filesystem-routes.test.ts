import pMap from 'p-map';
import path from 'path';
import { getFilesList } from '../files';
import { composeRouteTemplate } from '../templates';
import { goodPaths } from './sample';

describe('Read paths', () => {
  it('Get the list', async () => {
    const files = await getFilesList(path.resolve(__dirname, 'routes/good'));
    expect(files.sort()).toEqual(Object.keys(goodPaths).sort());
  });
});

describe('Parse paths', () => {
  it('Path to template', async () => {
    await pMap(
      Object.keys(goodPaths),
      async (goodPath) => {
        const reference = goodPaths[goodPath];
        const template = await composeRouteTemplate(goodPath);
        expect(template.method).toBe(reference.method);
        expect(template.requirePath).toBe(reference.requirePath);
        expect(template.route).toBe(reference.route);
      },
      { concurrency: 1 },
    );
  });
});
