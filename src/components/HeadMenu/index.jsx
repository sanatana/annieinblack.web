import annieInBlack from '@src/assets/logos/annie-in-black__sm.png';
import { useCallback, useEffect, useRef } from 'react';
let scrollTrackerTimeOut = null;
import { InternalLink } from '@src/components';
import { useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getTempUtilValue, setTempUtilValue } from '@src/redux/slices/utils/actions';

import './head_menu.scss';

const Links = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(setTempUtilValue('isMobileMenuOpen', null));
  }, [dispatch]);

  return (
    <>
      <InternalLink onClick={ onClick } clickThrough to="/about-us" className={ pathname.indexOf('/about-us') === 0 ? 'selected' : '' }>About</InternalLink>
      <InternalLink onClick={ onClick } clickThrough to="/our-music" className={ pathname.indexOf('/our-music') === 0 ? 'selected' : '' }>Music</InternalLink>
      <InternalLink onClick={ onClick } clickThrough to="/our-poetry" className={ pathname.indexOf('/our-poetry') === 0 ? 'selected' : '' }>Poetry</InternalLink>
      <InternalLink onClick={ onClick } clickThrough to="/contact-us" className={ pathname.indexOf('/contact-us') === 0 ? 'selected' : '' }>Contact</InternalLink>
    </>
  );
};

const MobileMenuListener = () => {
  const { isMobileMenuOpen } = useSelector((state) => state.utils.temp);

  useEffect(() => {
    const body = document?.body || null;
    if (!body) {
      return;
    }

    if (isMobileMenuOpen) {
      body.classList.add('mobile-menu--open');
      return;
    }

    body.classList.remove('mobile-menu--open');
  }, [isMobileMenuOpen]);

  return null;
};

const HeadMenu = () => {
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  const toggleMobileMenu = useCallback(() => {
    const isOpen = dispatch(getTempUtilValue('isMobileMenuOpen'));
    dispatch(setTempUtilValue('isMobileMenuOpen', isOpen ? null : true));
  }, [dispatch]);

  const updateScrollPercentage = useCallback(() => {
    clearTimeout(scrollTrackerTimeOut);

    scrollTrackerTimeOut = setTimeout(() => {
      if (!menuRef.current) {
        return;
      }

      const el = menuRef.current;
      const scrolled = window.scrollY;
      if (scrolled > 100) {
        if (!el.classList.contains('head-menu--sticky')) {
          el.classList.add('head-menu--sticky');
        }
      } else {
        if (el.classList.contains('head-menu--sticky')) {
          el.classList.remove('head-menu--sticky');
        }
      }
    }, 10);
  }, []);

  // Event listener to call the updateScrollPercentage function when scrolling
  useEffect(() => {
    window.removeEventListener('scroll', updateScrollPercentage);
    window.addEventListener('scroll', updateScrollPercentage);
    return () => {
      window.removeEventListener('scroll', updateScrollPercentage);
    };
  }, [updateScrollPercentage]);

  useEffect(() => {
    window.removeEventListener('scroll', updateScrollPercentage);
    window.addEventListener('scroll', updateScrollPercentage);

    return () => {
      window.removeEventListener('scroll', updateScrollPercentage);
    };
  }, [updateScrollPercentage]);

  return (
    <div className="head-menu" ref={ menuRef }>
      <MobileMenuListener />
      <div className="head-menu__inner">
        <div>
          <a href="/">
            <img src={ annieInBlack } className="logo" alt="Home"/>
          </a>
        </div>

        <div className="head-menu__links">
          <a className="head-menu__links-mobile-logo" href="/">
            <img src="/assets/images/annie-in-black.png" alt="annie-in-black"/>
          </a>
          <a href="/">Home</a>
          <Links />
        </div>
      </div>

      <button className="head-menu__mobile-menu-trigger" onClick={ toggleMobileMenu }>
        <img src="/assets/images/menu.svg" className="menu" alt="Menu"/>
        <img src="/assets/images/close.svg" className="close" alt="Close"/>
      </button>
    </div>
  );
};

export default HeadMenu;
