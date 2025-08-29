import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import iconPlay from '@src/assets/images/play_arrow.svg';
import iconPause from '@src/assets/images/pause.svg';
import iconPrev  from '@src/assets/images/keyboard_double_arrow_left.svg';
import iconNext  from '@src/assets/images/keyboard_double_arrow_right.svg';

import iconMute  from '@src/assets/images/volume_off.svg';
import iconVolume  from '@src/assets/images/volume_up.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerVolume } from '@src/redux/slices/song/actions';
import { trackEvent } from '@src/helpers/stats';

import './audio_player.scss';

function formatTime(s) {
  if (!Number.isFinite(s) || s < 0) { return '0:00'; }
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

const removePreview = (title) => {
  return title.replace(/\(Preview\)/i, '').trim();
};

const trackPlay = (songTitle, action) => {
  trackEvent('AudioPlayerHomePage', action, removePreview(songTitle));
};

const trackClickPlay = (songTitle) => {
  trackEvent('AudioPlayerHomePage', 'Click', removePreview(songTitle));
};

const scrollToActiveSong = (parent) => {
  if (!parent) { return; }

  const scroller = parent.querySelector('.simplebar-content-wrapper');
  if (!scroller) { return; }

  const el = scroller.querySelector('.is-active');
  if (!el) { return; }

  const parentRect = scroller.getBoundingClientRect();
  const childRect = el.getBoundingClientRect();

  const above = childRect.top < parentRect.top;
  const below = childRect.bottom > parentRect.bottom;

  if (above) {
    const delta = parentRect.top - childRect.top;
    scroller.scrollTo({ top: scroller.scrollTop - delta, behavior: 'smooth' });
  } else if (below) {
    const delta = childRect.bottom - parentRect.bottom;
    scroller.scrollTo({ top: scroller.scrollTop + delta, behavior: 'smooth' });
  }
};

const AudioPlayer = ({ tracks = [], onSongPlay, onSongStop }) => {
  const [index, setIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const audioRef = useRef(null);
  const rafRef = useRef(0);
  const progressRef = useRef(null);
  const containerRef = useRef(null);
  const { volume } = useSelector((state) => state.song);
  const currentTrack = useMemo(() => tracks[index] || null, [tracks, index]);
  const dispatch = useDispatch();

  const load = useCallback(() => {
    const a = audioRef.current;
    if (!a || !currentTrack) { return; }
    a.src = currentTrack.src;
    a.load();
    setCurrent(0);
    setDuration(0);
  }, [currentTrack]);

  const play = useCallback(async () => {
    const a = audioRef.current;
    if (!a) { return; }
    try {
      await a.play();
      setIsPlaying(true);
      if (onSongPlay) {
        onSongPlay(tracks[index]);
      }
    } catch { /* empty */ }
  }, [index, onSongPlay, tracks]);

  const pause = useCallback(() => {
    const a = audioRef.current;
    if (!a) { return; }
    a.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const next = useCallback(() => {
    setIndex(i => {
      const newIndex = (i + 1) % tracks.length;
      trackPlay(tracks[newIndex].title, 'Next');
      onSongPlay(tracks[newIndex]);
      return newIndex;
    });

    setIsPlaying(false);
  }, [onSongPlay, tracks]);

  const prev = useCallback(() => {
    setIndex(i => {
      const newIndex = (i - 1 + tracks.length) % tracks.length;
      trackPlay(tracks[newIndex].title, 'Prev');
      onSongPlay(tracks[newIndex]);
      return newIndex;
    });
    setIsPlaying(false);
  }, [onSongPlay, tracks]);

  const onLoadedMetadata = useCallback(() => {
    const a = audioRef.current;
    if (!a) { return; }
    setDuration(Number.isFinite(a.duration) ? a.duration : 0);
  }, []);

  const step = useCallback(() => {
    const a = audioRef.current;
    if (a) { setCurrent(a.currentTime || 0); }
    rafRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (isPlaying) { rafRef.current = requestAnimationFrame(step); }
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, step]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const a = audioRef.current;
    if (a) { a.muted = isMuted; }

  }, [isMuted]);

  useEffect(() => {
    const a = audioRef.current;
    if (a) { a.volume = volume; }
  }, [volume]);

  const onSeek = useCallback(e => {
    const a = audioRef.current;
    if (!a) { return; }
    const v = Number(e.target.value);
    a.currentTime = v;
    setCurrent(v);
  }, []);

  const onSelectTrack = useCallback((i) => {
    const a = audioRef.current;
    if (!a) { return; }

    // Clicking the current track toggles play/pause
    if (i === index) {
      if (isPlaying) {
        onSongStop();
      } else {
        onSongPlay(tracks[i]);
      }
      isPlaying ? a.pause() : a.play().catch(() => {});
      setIsPlaying(p => !p);
      return false;
    }

    // Switch track and play immediately
    setIndex(i);
    return true;
  }, [index, isPlaying, onSongPlay, tracks, onSongStop]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) { return undefined; }

    if (index === -1) {
      return undefined;
    }

    a.src = tracks[index].src;   // set the new source now (don’t wait for effects)
    a.load();

    // Try to play in the same click (best for autoplay policies)
    const tryPlay = () => a.play()
      .then(() => setIsPlaying(true))
      .then(() => {

        if (!containerRef.current) {
          return;
        }

        try {
          scrollToActiveSong(containerRef.current);

        } catch { /* empty */ }
      }).catch(() => {});
    tryPlay();

    const onReady = () => { tryPlay(); a.removeEventListener('loadedmetadata', onReady); a.removeEventListener('canplay', onReady); };
    a.addEventListener('loadedmetadata', onReady, { once: true });
    a.addEventListener('canplay', onReady, { once: true });
  }, [index, tracks]);

  useEffect(() => {
    if (!currentTrack) { return; }
    const img = new Image();
    if (currentTrack.cover) { img.src = currentTrack.cover; }
  }, [currentTrack]);

  return (
    <div ref={ containerRef } className="album-player__wrap">
      <div className="album-player">
        <SimpleBar className="album-player__list" autoHide={ false }>
          { (tracks || []).map((t, i) => (
            <button
              key={ `${t.id || t.src}-${i}` }
              className={ `album-player__item${i === index ? ' is-active' : ''}` }
              onClick={ () => {
                if (onSelectTrack(i) && index !== i) {
                  trackClickPlay(tracks[i].title);
                  onSongPlay(tracks[i]);
                }
              } }
              aria-current={ i === index ? 'true' : 'false' }
            >
              <div className="album-player__meta">
                <div>{ i + 1 }.</div>
                <div>
                  <div className="album-player__title">
                    { t.title }
                  </div>
                  <div className="album-player__artist">{ t.artist }</div>
                </div>
              </div>
              <div className="album-player__duration">{ t.duration ? formatTime(t.duration) : '' }</div>
            </button>
          )) }
        </SimpleBar>

        <div className="album-player__bar">
          <div className="album-player__controls">
            <button className="album-player__btn" onClick={ prev } aria-label="Previous">
              <img src={ iconPrev } alt="Previous song" />
            </button>
            <button
              className="album-player__btn plp-primary"
              onClick={ () => {
                if (isPlaying) {
                  onSongStop();
                }

                if (index === -1) {
                  trackPlay(tracks[0].title, 'Play');
                  setIndex(0);
                  onSongPlay(tracks[0]);
                  return;
                }
                togglePlay();
              }
              } aria-label={ isPlaying ? 'Pause' : 'Play' }>
              { isPlaying ? (
                <img src={ iconPause } alt="Pause" />
              ) : (
                <img src={ iconPlay } alt="Play"/>
              ) }
            </button>
            <button className="album-player__btn" onClick={ next } aria-label="Next">
              <img src={ iconNext } alt="Previous song"/>
            </button>
          </div>

          <div className="album-player__progress">
            <div className="album-player__time">{ formatTime(current) }</div>
            <input
              ref={ progressRef }
              type="range"
              min={ 0 }
              max={ duration || 0 }
              step="0.01"
              value={ Math.min(current, duration || 0) }
              onChange={ onSeek }
              aria-label="Seek"
            />
            <div className="album-player__time">{ formatTime(duration) }</div>
          </div>

          <div className="album-player__volume">
            <button className="album-player__btn" onClick={ () => setIsMuted(m => !m) } aria-label={ isMuted ? 'Unmute' : 'Mute' }>
              { isMuted ? (<img src={ iconMute } alt="Mutted"/>) : <img src={ iconVolume } alt="Mute"/> }
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={ isMuted ? 0 : volume }
              onChange={ e => {
                const v = Number(e.target.value);
                dispatch(setPlayerVolume(v));
                if (isMuted && v > 0) { setIsMuted(false); }
              } }
              aria-label="Volume"
            />
          </div>
        </div>
      </div>

      <audio
        ref={ audioRef }
        onLoadedMetadata={ onLoadedMetadata }
        onEnded={ next }
        preload="metadata"
      />
    </div>
  );
};

export default AudioPlayer;
