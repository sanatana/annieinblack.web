// YouTubePrivacyTracked.jsx
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './youtube.scss';

const PLAYER_STATE = { UNSTARTED: -1, ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5 };
const ORIGIN_NC = 'https://www.youtube-nocookie.com';
const ORIGIN_YT = 'https://www.youtube.com';
const ALLOWED_ORIGINS = new Set([ORIGIN_NC, ORIGIN_YT]);

// Seek/edge thresholds (tune if you want)
const SEEK_THRESHOLD_SECONDS = 2;   // consider jumps >= 2s as a seek
const SEEK_THRESHOLD_PERCENT = 0.01; // or >= 1% of total duration
const END_EPSILON_SECONDS = 1;      // “near end” window for scrub-to-end

export default function YouTubePrivacyTracked({
  videoId,
  title = 'YouTube video',
  className,
  posterUrl = '/assets/posters/i-remember.jpg',
  consentText = 'Click to load YouTube (privacy-enhanced)',
  storageKey = 'yt_privacy_embed',
  onEvent // (name, props) => void
}) {
  const instanceIdRef = useRef(`${videoId}-${Math.random().toString(36).slice(2)}`);

  const [visible, setVisible] = useState(false);   // poster becomes visible near viewport
  const [loaded, setLoaded] = useState(false);     // iframe injected
  const [remember, setRemember] = useState(false); // you’re not exposing a UI for this now

  const wrapperRef = useRef(null);
  const iframeRef = useRef(null);

  const lastStateRef = useRef(PLAYER_STATE.UNSTARTED);
  const hasStartedRef = useRef(false);
  const currentTimeRef = useRef(0);
  const durationRef = useRef(0);
  const pollIdRef = useRef(null);

  // Extra refs for robust seek detection
  const bufferingFromTimeRef = useRef(0);
  const prevBeforeBufferingRef = useRef(PLAYER_STATE.UNSTARTED);
  const seekJustHappenedRef = useRef(false);
  const seekTargetRef = useRef(0);

  const pageOrigin = typeof window !== 'undefined' ? window.location.origin : '';

  // ---- Storage helpers (kept; you’re not exposing a remember UI right now)
  const storageGet = useCallback(() => {
    try { const raw = localStorage.getItem(storageKey); return raw ? JSON.parse(raw) : {}; } catch { return {}; }
  }, [storageKey]);

  const storageSet = useCallback((obj) => {
    try { localStorage.setItem(storageKey, JSON.stringify(obj)); } catch {}
  }, [storageKey]);

  // ---- Tracking
  const track = useCallback((name, props) => {
    const a = window.analytics;
    const payload = { instanceId: instanceIdRef.current, videoId, title, ...props };
    if (a && typeof a.track === 'function') { a.track(name, payload); return; }
    if (onEvent) { onEvent(name, payload); }
  }, [onEvent, title, videoId]);

  const emitProgress = useCallback(() => {
    const seconds = Number.isFinite(currentTimeRef.current) ? currentTimeRef.current : 0;
    const rawDuration = durationRef.current;
    const hasDuration = Number.isFinite(rawDuration) && rawDuration > 0;
    const duration = hasDuration ? rawDuration : undefined;
    const percent = hasDuration ? Math.max(0, Math.min(100, (seconds / rawDuration) * 100)) : undefined;
    return { seconds, duration, percent };
  }, []);

  // ---- State machine with seek handling
  const onState = useCallback((state) => {
    // Note where buffering started and what came before it
    if (state === PLAYER_STATE.BUFFERING) {
      prevBeforeBufferingRef.current = lastStateRef.current;
      bufferingFromTimeRef.current = currentTimeRef.current || 0;
    }

    const p = emitProgress();
    if (state === lastStateRef.current) { return; }

    if (state === PLAYER_STATE.PLAYING) {
      const prev = lastStateRef.current;
      const from = bufferingFromTimeRef.current || 0;
      const to = currentTimeRef.current || 0;

      const jumpedBySeconds = Math.abs(to - from) >= SEEK_THRESHOLD_SECONDS;
      const jumpedByPercent = durationRef.current > 0
        ? Math.abs((to - from) / durationRef.current) >= SEEK_THRESHOLD_PERCENT
        : false;
      const jumped = prev === PLAYER_STATE.BUFFERING && (jumpedBySeconds || jumpedByPercent);

      const duration = durationRef.current || 0;
      const nearEnd = duration > 0 && (duration - to) <= END_EPSILON_SECONDS;

      if (jumped) {
        // Seek detected: emit Seek, suppress Play/Resume
        seekJustHappenedRef.current = true;
        seekTargetRef.current = to;
        track('Seek', {
          fromSeconds: from,
          toSeconds: to,
          delta: to - from,
          seconds: to,
          duration: duration || undefined,
          percent: duration ? (to / duration) * 100 : undefined,
          whilePaused: prevBeforeBufferingRef.current === PLAYER_STATE.PAUSED
        });
      } else if (!hasStartedRef.current) {
        // First actual play
        hasStartedRef.current = true;
        track('Play', { state, ...p });
      } else if (prev === PLAYER_STATE.PAUSED) {
        // Resume only from a pause (not from buffering)
        track('Resume', { state, ...p });
      } else if (nearEnd) {
        // Ignore accidental PLAYING blips right before end
      }
    } else if (state === PLAYER_STATE.PAUSED) {
      if (hasStartedRef.current) { track('Pause', { state, ...p }); }
    } else if (state === PLAYER_STATE.ENDED) {
      // Don’t report Complete if user scrubbed to (almost) the end
      const duration = durationRef.current || 0;
      const soughtTo = seekTargetRef.current || 0;
      const endedAfterSeekToEnd = seekJustHappenedRef.current && duration > 0 && (duration - soughtTo) <= END_EPSILON_SECONDS;

      if (!endedAfterSeekToEnd) {
        const pp = emitProgress();
        track('Complete', { state, seconds: pp.duration ?? pp.seconds, percent: 100, duration: pp.duration });
      }
      seekJustHappenedRef.current = false;
    }

    lastStateRef.current = state;
  }, [emitProgress, track]);

  // ---- Messaging with the iframe
  const post = useCallback((func, args = []) => {
    const win = iframeRef.current?.contentWindow;
    if (!win) { return; }
    win.postMessage(JSON.stringify({ event: 'command', func, args }), ORIGIN_NC);
  }, []);

  const handleMessage = useCallback((e) => {
    if (!iframeRef.current) { return; }
    if (!ALLOWED_ORIGINS.has(e.origin)) { return; }

    let data;
    try { data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch { return; }
    if (!data) { return; }

    if (data.event === 'onReady') {
      post('addEventListener', ['onStateChange']);
      post('getDuration');
      post('getCurrentTime');
      return;
    }

    if (data.event === 'onStateChange') {
      onState(Number(data.info));
      return;
    }

    if (data.event === 'infoDelivery' && data.info) {
      if (typeof data.info.currentTime === 'number') { currentTimeRef.current = data.info.currentTime; }
      if (typeof data.info.duration === 'number')     { durationRef.current   = data.info.duration; }
    }
  }, [onState, post]);

  const onIframeLoad = useCallback(() => {
    const win = iframeRef.current?.contentWindow;
    if (!win) { return; }
    const id = instanceIdRef.current;
    win.postMessage(JSON.stringify({ event: 'listening', id }), ORIGIN_NC);
    post('addEventListener', ['onReady']);
    post('getDuration');
    post('getCurrentTime');

    if (pollIdRef.current) { window.clearInterval(pollIdRef.current); }
    pollIdRef.current = window.setInterval(() => {
      post('getCurrentTime');
      post('getDuration');
    }, 1000);
  }, [post]);

  // ---- Lazy show poster near viewport
  useEffect(() => {
    if (visible) { return; }
    const el = wrapperRef.current;
    if (!el) { setVisible(true); return; }

    const hydrate = () => setVisible(true);
    const ro = 'requestIdleCallback' in window ? window.requestIdleCallback : null;

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((x) => x.isIntersecting)) {
          io.disconnect();
          if (ro) { ro(hydrate); } else { hydrate(); }
        }
      }, { rootMargin: '400px 0px' });
      io.observe(el);
      return () => io.disconnect();
    }

    hydrate();
  }, [visible]);

  // ---- Bind postMessage listeners when loaded
  useEffect(() => {
    if (!loaded) { return; }
    window.addEventListener('message', handleMessage);
    const el = iframeRef.current;
    el?.addEventListener('load', onIframeLoad);
    return () => {
      window.removeEventListener('message', handleMessage);
      el?.removeEventListener('load', onIframeLoad);
      if (pollIdRef.current) { window.clearInterval(pollIdRef.current); }
      pollIdRef.current = null;
      lastStateRef.current = PLAYER_STATE.UNSTARTED;
      hasStartedRef.current = false;
    };
  }, [loaded, handleMessage, onIframeLoad]);

  // ---- Handlers
  const handleClickLoad = useCallback(() => {
    if (remember) {
      const saved = storageGet();
      storageSet({ ...saved, [videoId]: true });
    }
    setLoaded(true);
  }, [remember, storageGet, storageSet, videoId]);

  const src = useMemo(() => {
    if (!loaded) { return ''; }
    const params = new URLSearchParams({
      enablejsapi: '1',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      origin: pageOrigin,
      autoplay: '1'
    });
    return `${ORIGIN_NC}/embed/${videoId}?${params.toString()}`;
  }, [loaded, pageOrigin, videoId]);

  return (
    <div ref={ wrapperRef } className={ `ytp-wrap ${className || ''}`.trim() }>
      <div className="ytp-aspect">
        { !loaded ? (
          visible && (
            <div className="ytp-poster" style={{ backgroundImage: `url("${posterUrl}")` }}>
              <div className="ytp-title">
                <div className="ytp-title-profile" />
                <div className="ytp-title-title">{ title }</div>
              </div>
              <button
                type="button"
                className="ytp-load"
                aria-label={ consentText }
                onClick={ handleClickLoad }
              >
                <img src="/assets/images/yt_play.svg" alt="play" />
              </button>
            </div>
          )
        ) : (
          <iframe
            ref={ iframeRef }
            className="ytp-iframe"
            title={ title }
            src={ src }
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) }
      </div>
    </div>
  );
}
