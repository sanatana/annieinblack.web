import { useEffect, useRef } from 'react';

const Video = () => {

  const videoRef = useRef(null);
  const lastSaveRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) { return; }

    // Restore position if saved
    const savedTime = sessionStorage.getItem('annie-in-black__video-time');

    if (savedTime && parseFloat(savedTime) > 0) {
      const apply = () => { video.currentTime = parseFloat(savedTime); };

      // if metadata already present, run immediately; else wait once
      if (video.readyState >= 1) { // HAVE_METADATA
        apply();
      } else {
        video.addEventListener('loadedmetadata', apply, { once: true });
      }
    }

    const saveTime = () => {
      const now = Date.now();
      // Only save every 2 seconds
      if (now - lastSaveRef.current >= 2000) {
        sessionStorage.setItem('annie-in-black__video-time', video.currentTime);
        lastSaveRef.current = now;
      }
    };

    video.addEventListener('timeupdate', saveTime);

    return () => {
      video.removeEventListener('timeupdate', saveTime);
    };
  }, []);

  return (
    <video
      ref={ videoRef }
      loop muted autoPlay playsInline poster="/assets/images/hero__001.jpg"
      className="hero-video">
      <source src="/assets/video/annie.mp4" type="video/mp4"/>
      <source src="/assets/video/annie.webm" type="video/webm"/>
    </video>
  );
};

export default Video;
