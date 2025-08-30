import { useEffect, useRef } from 'react';

import './lyrics-panel.scss';

const LyricsPanel = ({ close = () => null, slug, children }) => {
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
      <div className="lyrics-panel" />
    );
  }

  return (
    <>
      <div className="lyrics-panel lyrics-panel--open">
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
      <button className="lyrics-panel__overlay" aria-label="Close" onClick={ close }></button>
    </>
  );
};

export default LyricsPanel;
