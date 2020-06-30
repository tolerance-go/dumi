/**
 * export dumi theme context
 */
export { default as context } from './themes/context';
/**
 * Built-in components or hooks that can be imported through dumi/theme
 */
export { default as Layout } from './themes/Layout';
export { default as SlugLink } from './themes/SlugList';
export { default as NavbarLink } from './themes/Navbar';

/**
 * TODO Some hooks for developers
 */
export { default as useSearch } from './hooks/useSearch';
export { default as useCodesandBox } from './hooks/useCodesandBox';
export { default as useCopy } from './hooks/useCopy';

/**
 * The built-in components that need to be provided for consumption by dumi.
 * If there is no built-in component that will fallback to the default theme
 */
export { default as SourceCode } from './themes/builtins/SourceCode';
export { default as Previewer } from './themes/builtins/Previewer';
export { default as Alert } from './themes/builtins/Alert';
export { default as Badge } from './themes/builtins/Badge';
export { default as Example } from './themes/builtins/Example';

function Dumfn() {}
export {
  Dumfn as default
}
