import fs from 'fs';
import path from 'path';
import { getModuleResolvePath } from '../utils/moduleResolver';
import { SchemaParser } from '@alipay/yunfengdie-sdk';
import refParser from 'json-schema-ref-parser';
import { getDepsForDemo } from '../transformer/demo';

interface IBlockAsset {
  name: string;
  description: string;
  dependencies: {
    [key: string]: string;
  };
  files: {
    [key: string]: {
      path: string;
      value: string;
    };
  };
}

interface IExample {
  identifier: string;
  name: string;
  description: string;
  type: string;
  dependencies: {
    [key: string]: {
      type: string;
      value: string;
    };
  };
}

class AssetsPackage {
  root = process.cwd();

  name = '';

  description = '';

  examples: IExample[] = [];

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  /**
   * collect all atom assets from entry
   */
  async collectAtomAssets() {
    let entryPath: string;
    let entryContent: string;

    try {
      entryPath = getModuleResolvePath({ basePath: this.root, sourcePath: './src' });
      entryContent = fs.readFileSync(entryPath).toString();
    } catch (err) {
      /* TODO */
    }

    if (entryPath) {
      const fileDeps = getDepsForDemo(entryContent, {
        isTSX: path.parse(entryPath).ext.includes('.ts'),
        fileAbsPath: entryPath,
        depth: 1,
      }).files;
      const entryExports = {};

      Object.values(fileDeps).forEach((item) => {
        entryExports[path.parse(item.path).name] = item.content;
      });

      const parser = new SchemaParser({
        basePath: this.root,
        entryPath: './src/index.ts',
      });
      await parser.load();
      const result = await parser.parse();

      await (refParser as any).dereference(result, {
        dereference: {
          circular: 'ignore',
        },
      });
      // TODO: parse props by feiyi
      // write to this.atoms
      return Object.entries(result.components).reduce(
        (col, [name, v]) => ({
          ...col,
          [name]: v.props,
        }),
        {},
      );
    }
  }

  /**
   * add preset asset
   */
  addPresetAsset() {}

  /**
   * add block asset
   */
  addBlockAsset({ dependencies, files, ...meta }: IBlockAsset) {
    this.examples.push({
      ...meta,
      identifier: '123',
      type: 'BLOCK',
      dependencies: {
        // append npm dependencies
        ...Object.entries(dependencies).reduce(
          (deps, [pkg, version]) =>
            Object.assign(deps, {
              [pkg]: {
                type: 'NPM',
                value: version,
              },
            }),
          {},
        ),
        // append local file dependencies
        ...Object.entries(files).reduce(
          (result, [file, { value }]) =>
            Object.assign(result, {
              [file]: {
                type: 'FILE',
                value,
              },
            }),
          {},
        ),
      },
    });
  }

  /**
   * export asset package meta data
   */
  async export() {
    return {
      name: this.name,
      description: this.description,
      assets: {
        examples: this.examples,
        atoms: await this.collectAtomAssets(),
      },
    };
  }
}

export default AssetsPackage;
