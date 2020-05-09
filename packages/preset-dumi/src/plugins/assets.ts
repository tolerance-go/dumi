import fs from 'fs';
import url from 'url';
import path from 'path';
import { IApi } from '@umijs/types';
import axios from 'axios';
import Assets from '../assets';
import getRouteConfig from '../routes/getRouteConfig';
import ctx, { init as setContext } from '../context';

export default (api: IApi) => {
  const assetsPkg = new Assets(api.pkg);
  // register assets command
  api.registerCommand({
    name: 'assets',
    async fn() {
      setContext(ctx.umi, ctx.opts, assetsPkg);

      getRouteConfig(api, ctx.opts);

      const assetsJSON = JSON.stringify(await assetsPkg.export(), null, 2);

      // for yunfengdie
      api.writeTmpFile({
        path: '.assets.json',
        content: assetsJSON,
      });

      // for umi ui
      fs.writeFileSync(path.join(api.cwd, 'dist/assets.json'), assetsJSON);
    },
  });

  api.registerCommand({
    name: 'assets-publish',
    async fn() {
      const host = 'http://yunfengdie.dev.alipay.net';
      const url = `${host}/api/assetsPackage/${encodeURIComponent(api.pkg.name)}/autoRelease`;
      const res = await axios.request({
        method: 'POST',
        responseType: 'json',
        url,
      });
      if (res.status === 200) {
        const { title, sites } = res.data;
        console.log('[发布到云凤蝶资产包]', title);
        sites.forEach((s) => {
          console.log('[推送到应用]', `${host}/editor/console/${s}`);
        });
      }
    },
  });

  api.onGenerateFiles(async () => {
    api.writeTmpFile({
      path: '.dumi/assets.json',
      content: JSON.stringify(await assetsPkg.export()),
    });
  });

  api.addMiddewares(() => (req, res, next) => {
    const parsed = url.parse(req.url);

    if (parsed.pathname === '/_dumi/presets' && req.method === 'POST') {
      let data = '';

      req.on('data', (chunk) => (data += chunk));
      req.on('end', async () => {
        try {
          assetsPkg.setPresets(data);
          api.writeTmpFile({
            path: '.dumi/assets.json',
            content: JSON.stringify(await assetsPkg.export()),
          });
        } catch (err) {
          /* */
        }
        next();
      });
    } else {
      next();
    }
  });
};
