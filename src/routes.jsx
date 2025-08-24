import { lazy } from 'react';
import { PageLoader, Layout } from '@src/components';

const Home = PageLoader(lazy(() => import('./pages/Home')));
const About = PageLoader(lazy(() => import('./pages/About')));
const Music = PageLoader(lazy(() => import('./pages/Music')));
const Album = PageLoader(lazy(() => import('./pages/Album')));
const NotFound = PageLoader(lazy(() => import('./pages/404')));
const Contact = PageLoader(lazy(() => import('./pages/Contact')));
const Privacy = PageLoader(lazy(() => import('./pages/Privacy')));

const routes = [
  {
    element: <>
      <Layout />
    </>,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about-us', element: <About /> },
      { path: '/contact-us', element: <Contact /> },
      { path: '/our-music', element: <Music /> },
      { path: '/our-music/hollow', element: <Album /> },
      { path: '/our-music/hollow/:song', element: <Album /> },
      { path: '/our-music/hollow/:song/:play', element: <Album /> },
      { path: '/privacy-policy', element: <Privacy /> },
      { path: '*', element: <NotFound /> },
    ]
  },
];

export default routes;
