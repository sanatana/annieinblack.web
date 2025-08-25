import { useCallback, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Footer, HeadMenu } from '@src/components';
import CookieBanner from '@src/components/CookieBanner';

const Index = ({ children }) => {
  const { pathname, state } = useLocation();

  const goToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (state?.noScroll) { return; }
    goToTop();
  }, [goToTop, pathname,state]);

  return (
    <>
      <div
        className="page-container"
      >
        <HeadMenu />

        <div>
          { children }
          <Outlet />
        </div>

        <CookieBanner />
        <Footer />
      </div>
    </>
  );
};

Index.propTypes = {

  children: PropTypes.any,
};

export default Index;
