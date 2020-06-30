import React from 'react';
/**
 * TODO This type definition needs to consider merging with preset-dumi
 */
// import { IDumiOpts } from '../..';
import { ILocale, INavItem, IMenuItem, Imode } from '../typings/theme';

interface IContext {
  rootPath: string;
  slug: string;
  locale: string;
  locales: ILocale[];
  navs: INavItem[];
  menus: IMenuItem[];
  mode?: Imode;
  logo?: string | boolean;
  title?: string;
  desc?: string;
  repoUrl: string;
  routeMeta: { [key: string]: any };
  algolia?: {
    apiKey: string;
    indexName: string;
    debug?: boolean;
  }
}

export default React.createContext<IContext>({
  /**
   * current root path (with locale prefix)
   */
  rootPath: '/',
  /**
   * current slug
   */
  slug: '',
  /**
   * current locale name
   */
  locale: '',
  /**
   * all available locales
   */
  locales: [],
  /**
   * mode
   */
  mode: 'doc',
  /**
   * logo URL
   */
  logo: '',
  /**
   * title
   */
  title: '',
  /**
   * desc
   */
  desc: '',
  /**
   * repository url
   */
  repoUrl: '',
  /**
   * nav list for current locale
   */
  navs: [],
  /**
   * menu list for current locale with current path
   */
  menus: [],
  /**
   * meta of current route
   */
  routeMeta: {},
});
