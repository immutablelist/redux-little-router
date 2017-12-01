// @flow
import type { History } from 'history';

import createBrowserHistory from 'history/createBrowserHistory';

import normalizeHref from '../util/normalize-href';

type BrowserRouterArgs = {
  routes: Object,
  basename: string,
  history: History
};

export default (install) =>
  ({
    routes,
    basename,
    history = createBrowserHistory({ basename })
  }: BrowserRouterArgs) => {
    const {
      pathname: fullPathname,
      search,
      hash,
      state: { key, state } = {}
    } = history.location;

    // Strip the basename from the initial pathname
    const pathname = basename && fullPathname.indexOf(basename) === 0
      ? fullPathname.slice(basename.length)
      : fullPathname;

    const descriptor = basename
      ? { pathname, basename, search, hash, key, state }
      : { pathname, search, hash, key, state };

    const location = normalizeHref(descriptor);

    return install({ routes, history, location });
  };


