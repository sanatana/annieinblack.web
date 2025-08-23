import { lazy } from 'react';
import { PageLoader, Layout } from '@src/components';

const Home = PageLoader(lazy(() => import('./pages/Home')));
const About = PageLoader(lazy(() => import('./pages/About')));
const Music = PageLoader(lazy(() => import('./pages/Music')));
const Album = PageLoader(lazy(() => import('./pages/Album')));
const NotFound = PageLoader(lazy(() => import('./pages/404')));

const routes = [
  {
    path: '/',
    element: <>
      <Layout><Home/></Layout>
    </>,
  },
  {
    path: '/about-us',
    element: <>
      <Layout><About/></Layout>
    </>,
  },
  {
    path: '/our-music',
    element: <>
      <Layout><Music/></Layout>
    </>,
  },
  {
    path: '/our-music/hollow',
    element: <>
      <Layout><Album/></Layout>
    </>,
  },
  {
    path: '/our-music/hollow/:song',
    element: <>
      <Layout><Album/></Layout>
    </>,
  },
  {
    path: '/our-music/hollow/:song/:play',
    element: <>
      <Layout><Album/></Layout>
    </>,
  },
  {
    path: '*',
    element: <Layout><NotFound /></Layout>,
  },
];

export default routes;
