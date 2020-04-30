import { IApi } from '@umijs/types';
import axios from 'axios';
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

  api.registerCommand({
    name: 'assets-publish',
    async fn() {
      const url = `http://yunfengdie.local.alipay.net:7001/api/assetsPackage/${encodeURIComponent(
        api.pkg.name,
      )}/autoRelease`;
      const res = await axios.request({
        method: 'POST',
        url,
      });
      if (res.status === 200) {
        console.log('[autoRelease to yunfengdie]', res.data.message);
      }
    },
  });

  api.onGenerateFiles(async () => {
    api.writeTmpFile({
      path: '.dumi/assets.json',
      content: JSON.stringify(await assetsPkg.export()),
    });
  });
};
