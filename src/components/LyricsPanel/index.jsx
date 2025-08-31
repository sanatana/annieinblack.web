import { useEffect, useRef } from 'react';

import './lyrics-panel.scss';
import useEscAction from '@src/hooks/useEscAction';

const LyricsPanel = ({ close = () => null, slug, children }) => {

  useEscAction(close);

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
      <div className="lyrics-panel__wrapper">
        <div className="lyrics-panel__flex">
          <button className="lyrics-panel__overlay" aria-hidden />
          <div className="lyrics-panel"/>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="lyrics-panel__wrapper lyrics-panel__wrapper--open">
        <div className="lyrics-panel__flex">
          <button className="lyrics-panel__overlay" aria-label="Close" onClick={ close }></button>
          <div className="lyrics-panel">
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
        </div>
      </div>
    </>
  );
};

export default LyricsPanel;
