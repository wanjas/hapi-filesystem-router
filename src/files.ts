import path from 'path';
import fs from 'fs/promises';
import { constants as fsConstants } from 'fs';
import pMap from 'p-map';

export function toAbsolutePath(p: string): string {
  if (path.isAbsolute(p)) {
    return p;
  }

  return path.resolve(process.cwd(), p);
}

export async function isReadable(p): Promise<boolean> {
  try {
    await fs.access(p, fsConstants.R_OK);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getFilesList(
  rootPath: string,
  subPath = '',
): Promise<string[]> {
  const fullPath = path.join(rootPath, subPath);
  const items = await fs.readdir(fullPath, { withFileTypes: true });

  const files = await pMap(
    items,
    async (item) => {
      if (item.isSymbolicLink()) {
        throw new Error("Symbolic links aren't supported");
      }
      const itemPath = path.join(subPath, item.name);
      if (item.isDirectory()) {
        return getFilesList(rootPath, itemPath);
      }

      return itemPath;
    },
    {
      // arbitrary number
      concurrency: 5,
    },
  );

  const list = files.flat();

  if (list.length === 0) {
    console.warn(`Empty sub-path [${subPath}]`);
  }

  return list;
}
