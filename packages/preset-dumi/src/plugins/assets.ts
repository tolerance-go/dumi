import { IApi } from '@umijs/types';
import Assets from '../assets';

export default (api: IApi) => {
  const assetsPkg = new Assets(api.pkg);
  // register assets command
  api.registerCommand({
    name: 'assets',
    async fn() {
      api.writeTmpFile({
        path: '.assets.json',
        content: JSON.stringify(await assetsPkg.export(), null, 2),
      });
    },
  });

  api.onGenerateFiles(async () => {
    api.writeTmpFile({
      path: '.dumi/assets.json',
      content: JSON.stringify(await assetsPkg.export()),
    });
  });
};
