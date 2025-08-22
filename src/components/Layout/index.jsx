import { useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Footer } from '@src/components';

const Index = ({ children }) => {
  const navigate = useNavigate();

  const goToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    goToTop();
  }, [goToTop, navigate]);

  return (
    <>
      <div
        className="page-container"
      >
        <div>
          { children }
          <Outlet />
        </div>

        <Footer />
      </div>
    </>
  );
};

Index.propTypes = {

  children: PropTypes.any,
};

export default Index;
