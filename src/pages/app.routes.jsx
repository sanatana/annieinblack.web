import { lazy } from 'react';
import { routes } from '../config';
import PageLazyLoader from '@src/components/PageLoader';

const Home = PageLazyLoader(lazy(() => import('./Home')));

const appRoutes = [
  {
    path: routes.HOME.path,
    element: <Home />,
  },
];

export default appRoutes;
