import { lazy } from 'react';
import {PageLoader, Layout} from '@src/components';

const Home = PageLoader(lazy(() => import('./pages/Home')));
const NotFound = PageLoader(lazy(() => import('./pages/404')));

const routes = [
  {
    path: '/',
    element: <>
      <Layout><Home/></Layout>
    </>,
  },
  {
    path: '*',
    element: <Layout><NotFound /></Layout>,
  },
];

export default routes;
