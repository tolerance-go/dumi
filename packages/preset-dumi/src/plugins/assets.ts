import { IApi } from '@umijs/types';
import Assets from '../assets';

export default (api: IApi) => {
  // register assets command
  api.registerCommand({
    name: 'assets',
    fn() {
      const assetsPkg = new Assets(api.userConfig.title, api.userConfig.description);

      console.log(assetsPkg.export());
    },
  });
};
