import { Loadable } from '@src/components';
import { lazy, useCallback, useEffect, useRef } from 'react';
const Songs = Loadable(lazy(() => import('@src/pages/Album/hollow/Songs')));

import './lyrics-panel.scss';

const LyricsPanel = ({ close = () => null, slug }) => {
  const panelRef = useRef(null);

  const handleClose = useCallback(() => {

  }, [close, slug]);

  useEffect(() => {
    if (slug) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [slug]);

  if (!slug) {
    return (
      <div className="lyrics-panel" ref={ panelRef } />
    );
  }

  return (
    <>
      <div className="lyrics-panel lyrics-panel--open" ref={ panelRef }>
        <button
          className="lyrics-panel__close"
          onClick={ close }>X
        </button>

        <div className="lyrics-panel__inner">
          <div className="lyrics-panel__text">
            <Songs slug={ slug }/>
          </div>
        </div>
      </div>
      <button className="lyrics-panel__overlay" onClick={ handleClose }></button>
    </>
  );
};

export default LyricsPanel;
