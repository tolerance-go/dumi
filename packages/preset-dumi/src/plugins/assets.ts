import { IApi } from '@umijs/types';
import Assets from '../assets';

export default (api: IApi) => {
  const assetsPkg = new Assets(api.userConfig.title, api.userConfig.description);

  // register assets command
  api.registerCommand({
    name: 'assets',
    fn() {
      console.log(assetsPkg.export());
    },
  });

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: '.dumi/assets.json',
      content: JSON.stringify(assetsPkg.export()),
    });
  });
};
