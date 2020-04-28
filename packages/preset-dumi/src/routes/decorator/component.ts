import path from 'path';
import { getModuleResolvePath } from '../../utils/moduleResolver';
import { RouteProcessor } from '.';

/**
 * bind component for route
 */
export default ((routes) =>
  routes.map((route) => {
    if (route.component?.endsWith('index.md')) {
      try {
        const mdBaseDir = path.parse(route.component).dir;

        getModuleResolvePath({ basePath: mdBaseDir, sourcePath: './index', silent: true });
        // TODO: use Foo as module export from /src/Foo currently
        route.meta.module = path.parse(mdBaseDir).name;
      } catch (err) {
        /* nothing */
      }
    }

    return route;
  })) as RouteProcessor;
