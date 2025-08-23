import annieInBlack from '@src/assets/logos/annie-in-black__sm.png';
import { useCallback, useEffect, useRef } from 'react';
let scrollTrackerTimeOut = null;
import { InternalLink } from '@src/components';

import './head_menu.scss';

const HeadMenu = () => {
  const menuRef = useRef(null);

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
      <div className="head-menu__inner">
        <div>
          <a href="/">
            <img src={ annieInBlack } alt="Home" />
          </a>
        </div>
        <div className="head-menu__links">
          <a href="/">Home</a>
          <InternalLink to="/about-us">About</InternalLink>
          <InternalLink to="/our-music">Music</InternalLink>
          <InternalLink to="/contact-us">Contact</InternalLink>
        </div>
      </div>
    </div>
  );
};

export default HeadMenu;
