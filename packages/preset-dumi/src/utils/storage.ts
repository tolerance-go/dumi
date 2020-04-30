import fs from 'fs';
import path from 'path';
import deepmerge from 'deepmerge';

const STORAGE_PATH = path.join(process.cwd(), '.dumi/config.json');
let storage = {};

export const setConfig = (chunk: object) => {
  storage = deepmerge(storage, chunk);
};

export const getConfig = (forceFromFs?: boolean) => {
  if (forceFromFs && fs.existsSync(STORAGE_PATH)) {
    storage = deepmerge(storage, require(STORAGE_PATH));
  }

  return storage;
};

// initial storage
getConfig();
