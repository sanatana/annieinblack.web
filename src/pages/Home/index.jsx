import setPageTitle from '@src/helpers/html/set_page_title';
import AnnieInBlack from '@src/assets/logos/annie-in-black.png';
import AudioPlayer from '@src/pages/Home/partial/AudioPlayer';
import { lazy, useCallback, useEffect } from 'react';
import hollowTracks from '@src/data/hollow';
import { InternalLink, Loadable, LyricsPanel, Video, WaveForm } from '@src/components';
import { trackEvent, trackExternalLink } from '@src/helpers/stats';
import { useDispatch, useSelector } from 'react-redux';
import { setTempUtilValue } from '@src/redux/slices/utils/actions';

import './home_page.scss';
import YouTubeVideo from '@src/components/YouTubeVideo';

const Songs = Loadable(lazy(() => import('@src/pages/Album/hollow/Songs')));

const removePreview = (title) => {
  if (!title) {
    return null;
  }
  return title.replace(/\(Preview\)/i, '').trim();
};

const trackClickLyrics = (songTitle) => {
  trackEvent('ShowLyrics', 'Click', removePreview(songTitle));
};

const PageTitle = () => {

  useEffect(() => {
    setPageTitle(null, 'experimental rock band blending emotional depth with melodic intensity', '/');
  }, []);

  return null;
};

const HomeHeader = () => {
  return (
    <section className="home-page__hero">
      <Video/>

      <div className="home-page__hero-content">
        <h1>Annie in Black</h1>
        <img src={ AnnieInBlack } alt="Annie In Black"/>
        <p>soundtracks of loss, sorrow and regrets - dark, honest &amp; true</p>
      </div>
    </section>
  );
};

const Lyrics = () => {
  const dispatch = useDispatch();
  const { openLyrics } = useSelector((state) => state.utils.temp);

  const close = useCallback(() => {
    dispatch(setTempUtilValue('openLyrics', null));
  }, [dispatch]);

  return (
    <LyricsPanel slug={ openLyrics?.slug } close={ close }>
      <Songs slug={ openLyrics?.slug }/>
    </LyricsPanel>
  );
};

const SongPlayingIndicator = () => {
  const dispatch = useDispatch();

  const { songPlaying } = useSelector((state) => state.utils.temp);

  const showLyrics = useCallback((song) => {
    trackClickLyrics(song?.title);
    dispatch(setTempUtilValue('openLyrics', { slug: song?.slug, show: true }));
  }, [dispatch]);

  if (!songPlaying) {
    return (
      <div className="now-playing">
        <div className="now-playing__title">
          <div>&nbsp;</div>
          <em>&nbsp;</em>
          <button>lyrics</button>
        </div>

        <div className="waveform"/>
      </div>
    );
  }

  return (
    <div className="now-playing now-playing--open">
      <div className="now-playing__title">
        <div>{ removePreview(songPlaying?.title) }</div>
        <em>
          { songPlaying?.artist }
        </em>

        <button onClick={ () => showLyrics(songPlaying) }>Show lyrics</button>
      </div>
      <WaveForm/>
    </div>
  );
};

const NewRelease = () => {
  const dispatch = useDispatch();
  const onSongPlay = useCallback((song) => {
    dispatch(setTempUtilValue('songPlaying', song));
  }, [dispatch]);

  const onSongStop = useCallback(() => {
    dispatch(setTempUtilValue('songPlaying', null));
  }, [dispatch]);

  return (
    <section className="new-release">
      <h2>New release</h2>
      <p>August 22nd, 2025</p>
      <p className="new-release__intro">
        <b>Hollow</b> is a 15-track journey through isolation, loss, sorrow, and resilience.
        From sleepless nights and haunting memories to raw reflections on loss, grief, war and struggles too heavy to
        carry.
        Hollow blends dark honesty with atmospheric guitars and powerful vocals.
        Songs that echo pain, but still somehow search for meaning in the dark.<br/>

        <InternalLink to={ `/our-music/hollow` }>Behind Hollow + lyrics</InternalLink>
      </p>
      <article>
        <img className="cover" src="/assets/images/annie-in-black-hollow.jpg" alt="Annie In Black - Hollow"/>

        <div className="new-release__play-list">
          <AudioPlayer tracks={ hollowTracks } onSongPlay={ onSongPlay } onSongStop={ onSongStop }/>
        </div>
      </article>

      <div className="new-release__links-wrapper">
        <p>Now available on:</p>
        <div className="new-release__links">
          <a onClick={ trackExternalLink } target="_blank" rel="nofollow noopener noreferrer"
            href="https://open.spotify.com/album/0l4vbw7bPxNVOwUyx2RaRL">Spotify</a>
          <a onClick={ trackExternalLink } target="_blank" rel="nofollow noopener noreferrer"
            href="https://www.amazon.com/dp/B0FN5DXJJ2">Amazon</a>
          <a onClick={ trackExternalLink } target="_blank" rel="nofollow noopener noreferrer"
            href="https://itunes.apple.com/album/id1834542160?ls=1&app=itunes">iTunes</a>
          <a onClick={ trackExternalLink } target="_blank" rel="nofollow noopener noreferrer"
            href="https://music.youtube.com/watch?v=AnpA--zGgT4&list=OLAK5uy_mQSyoPMgglQXTsafZ951L1ufkxpxJkq08">YouTube
            music</a>
          <a onClick={ trackExternalLink } target="_blank" rel="nofollow noopener noreferrer"
            href="https://annieinblack.bandcamp.com/album/hollow">BandCamp</a>
          <a
            onClick={ trackExternalLink }
            target="_blank" rel="nofollow noopener noreferrer"
            href="https://tidal.com/album/455294880"
          >
            Tidal
          </a>
        </div>
      </div>
    </section>
  );
};

const Videos = () => {
  const onEvent = useCallback((eventName, properties) => {

    if (eventName === 'Play') {
      { trackEvent(`Video`, `${eventName}`, properties.title); }
    }

    if (eventName === 'Complete') {
      { trackEvent(`Video`, `${eventName}`, properties.title); }
    }

  }, []);

  return (
    <section className="new-release__video">
      <h2>Music videos</h2>
      <p className="new-release__video-description">
        “<strong>I Remember</strong>” is the opening track from Hollow.
        This song and video are a tribute to friends and loved ones we’ve lost — a token of appreciation and remembrance
        for the memories we shared, the silence they left behind, and the grief that never truly fades.
      </p>

      <YouTubeVideo
        title="I remember"
        videoId="QSLscmzLzNI"
        posterUrl="/assets/posters/i-remember.jpg"
        onEvent={ onEvent }
      />

      <p className="new-release__video-description new-release__video-description-n">
        “<strong>Whisper in the Storm</strong>” captures the quiet battles we fight in silence — the weight of grief,
        the voices that linger, and the struggle of carrying what others can’t see. It’s both a tribute to those
        we’ve lost and a reminder that even in the darkest moments, no one should have to face the storms alone.
      </p>

      <YouTubeVideo
        title="Whisper in the storm"
        videoId="mnWkCATH6-g"
        posterUrl="/assets/posters/whisper-in-the-storm.jpg"
        onEvent={ onEvent }
      />

      <p className="new-release__video-legal">
        ** Our site uses YouTube’s privacy-enhanced embed service (youtube-nocookie.com).
        Videos are not loaded until you press play.
        No cookies are set or stored by YouTube as part of this integration.
      </p>
    </section>
  );
};
const HomePageContent = () => {

  return (
    <div className="home-page__content">
      <NewRelease/>
      <Videos/>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="home-page">
      <PageTitle/>
      <HomeHeader/>
      <HomePageContent/>
      <SongPlayingIndicator/>
      <Lyrics/>
    </div>
  );
};

export default HomePage;
