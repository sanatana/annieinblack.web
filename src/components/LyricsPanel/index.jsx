import { useCallback, useEffect, useRef } from 'react';

import './lyrics-panel.scss';

const LyricsPanel = ({ close = () => null, slug, children }) => {
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
            { !!children && (children) }
          </div>
        </div>
      </div>
      <button className="lyrics-panel__overlay" onClick={ handleClose }></button>
    </>
  );
};

export default LyricsPanel;
