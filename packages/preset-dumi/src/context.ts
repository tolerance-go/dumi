import { IApi } from '@umijs/types';
import { IDumiOpts } from '.';
import Assets from './assets';

const context: { umi?: IApi; opts?: IDumiOpts; assets?: InstanceType<typeof Assets> } = {};

export function init(umi: IApi, opts: IDumiOpts, assets?: InstanceType<typeof Assets>) {
  context.umi = umi;
  context.opts = opts;
  context.assets = assets;
}

export default context;
