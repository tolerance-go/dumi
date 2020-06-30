/**
 * locale type
 * resolve from routes
 */
export interface ILocale {
  name: string;
  label: string;
}

/**
 * nav item type
 * resolve from routes
 */
export interface INavItem {
  title: string;
  path?: string;
  [key: string]: any;
  children: INavItem[];
}

export interface INav {
  [key: string]: INavItem[];
}

/**
 * menu & menu item type
 * resolve from routes
 */
export interface IMenuItem {
  path?: string;
  title: string;
  meta?: { [key: string]: any };
  children?: IMenuItem[];
}

export interface IMenu {
  // locale level
  [key: string]: {
    // path level
    '*'?: IMenuItem[];
    [key: string]: IMenuItem[];
  };
}

/**
 * mode
 */
export type Imode = 'doc' | 'site';
