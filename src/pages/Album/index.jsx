import { useCallback , useEffect, useRef } from 'react';
import setPageTitle from '@src/helpers/html/set_page_title';
import { LyricsPanel, Video } from '@src/components';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import trackList from '@src/data/hollow';
import iconPlay from '@src/assets/images/play_arrow.svg';
import iconLyrics from '@src/assets/images/lyrics.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { hideSong, setPlayerVolume, showSong } from '@src/redux/slices/song/actions';
import Songs from './hollow/Songs';
import { keyboard } from '@src/config';

import iconPause from '@src/assets/images/pause.svg';
import iconMute  from '@src/assets/images/volume_off.svg';
import iconVolume  from '@src/assets/images/volume_up.svg';

import './album.scss';
import { trackEvent, trackExternalLink } from '@src/helpers/stats';

const Empty = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path />
  </svg>
);

const PageTitle = () => {

  useEffect(() => {
    setPageTitle('Album: Hollow', 'What inspires us and how we create our music', '/our-music/hollow');
  }, []);

  return null;
};

const PageHeaderText = () => {

  const { show, data } = useSelector((state) => state.song);

  if (data?.title && show) {
    return (
      <>
        <h1 className="h1__title">Our songs - { data.title }</h1>
        <h2>Song by Annie in Black</h2>
      </>);
  }

  return (
    <>
      <h1 className="h1__title">Our Music - Hollow</h1>
      <h2>Symphony of sorrow my endless refrain...</h2>
    </>
  );
};

const PageHeader = () => {
  return (
    <section className="album__hero">
      <Video/>
      <div className="album__hero-content">
        <PageHeaderText/>
      </div>

    </section>
  );
};

const SongList = () => {
  const navigate = useNavigate();

  const playSong = useCallback((slug) => {
    const url = `/our-music/hollow/${slug}/play`;
    navigate(url, { state: { noScroll: true } });
  }, [navigate]);

  const showLyrics = useCallback((slug) => {
    const url = `/our-music/hollow/${slug}`;
    navigate(url, { state: { noScroll: true } });
  }, [navigate]);

  return (
    <aside>
      <ul className="album__list">
        {
          trackList.map((track, index) => (
            <li key={ track.slug } className="album__list-item">
              <div className="album__list-item-title" onClick={ () => showLyrics(track.slug) }>
                <b>{ index + 1 }.</b>
                <span>{ track.title.replace('(Preview)', '') }</span>
              </div>

              <div className="album__list-item-buttons">
                <button onClick={ () => playSong(track.slug) }>
                  <img src={ iconPlay } className="album__list-play" alt="Play song preview"/>
                </button>

                <button onClick={ () => showLyrics(track.slug) }>
                  <img src={ iconLyrics } className="album__list-lyrics" alt="View lyrics"/>
                </button>
              </div>
            </li>
          ))
        }
      </ul>

      <div className="album__links-wrapper">
        <p>Now available on:</p>
        <div className="album__links">
          <a
            onClick={ trackExternalLink }
            target="_blank" rel="nofollow noopener noreferrer"
            href="https://open.spotify.com/album/0l4vbw7bPxNVOwUyx2RaRL">Spotify</a>
          <a
            onClick={ trackExternalLink }
            target="_blank" rel="nofollow noopener noreferrer" href="https://www.amazon.com/dp/B0FN5DXJJ2">Amazon</a>
          <a
            onClick={ trackExternalLink }
            target="_blank" rel="nofollow noopener noreferrer"
            href="https://itunes.apple.com/album/id1834542160?ls=1&app=itunes">iTunes</a>
          <a
            onClick={ trackExternalLink }
            target="_blank" rel="nofollow noopener noreferrer"
            href="https://music.youtube.com/watch?v=AnpA--zGgT4&list=OLAK5uy_mQSyoPMgglQXTsafZ951L1ufkxpxJkq08">YouTube
            music</a>
          <a
            onClick={ trackExternalLink }
            target="_blank" rel="nofollow noopener noreferrer"
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
    </aside>
  );
};

const PageContent = () => {

  return (
    <div className="album__content">
      <div className="album__content-1">
        <img src="/assets/images/annie-in-black-hollow.jpg" alt="Annie in Black - Hollow"/>
      </div>

      <div className="album__content-2">
        <p>Album <strong>Hollow</strong> was born from silence, grief, and the memories of those we’ve lost — friends and family taken by illness, self-harm, or struggles too heavy to carry. These songs carry fragments of that experience: some give voice to the darkness itself, others linger in the sorrow, the loneliness, and the empty spaces left behind. They also touch on the senselessness of war — the way it leaves only absence, pain, and questions that can never be answered.
        </p>
        <p>The title Hollow speaks to that feeling of being emptied out, when the noise of the world fades and only shadows remain. It is both absence and echo — the weight of loss, and the silence that follows. Each track is a reflection of that space, where grief, memory, and fragile resilience come together in sound.
        </p>
        <SongList/>

      </div>
    </div>
  );
};

const SongListener = () => {
  const { song, play } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (song) {
      const targetSong = trackList.find((track) => track.slug === song);
      if (targetSong) {
        const index = trackList.findIndex((track) => track.slug === song);
        dispatch(showSong(targetSong, play === 'play', index ));

        if (play && play !== 'play') {
          navigate(`/our-music/hollow/${targetSong.slug}`, { state: { noScroll: true } });
        }
      } else {
        navigate(`/our-music/hollow`, { replace: true });
      }
    } else {
      dispatch(hideSong());
    }
  }, [dispatch, navigate, play, song]);
};

const FaPlay = () => {
  return (<img src={ iconPlay } alt="Play" />);
};

const FaPause = () => {
  return (<img src={ iconPause } alt="Pause" />);
};
const FaVolumeUp = () => {
  return (<img src={ iconVolume } alt="Volume" />);
};

const FaVolumeMute = () => {
  return (<img src={ iconMute } alt="Mute" />);
};

const removePreview = (title) => {
  return title.replace(/\(Preview\)/i, '').trim();
};

const trackPlay = (songTitle) => {
  if (!songTitle) {
    return;
  }

  trackEvent('AudioPlayerLyrics', 'Play', removePreview(songTitle));
};

const LyricsAndPlayer = () => {
  const { play, show, data, volume } = useSelector((state) => state.song);
  const navigate = useNavigate();
  const panelRef = useRef(null);
  const dispatch = useDispatch();

  const next = useCallback(() => {
    const song = trackList[data.index + 1]?.slug;
    let url = `/our-music/hollow/${song}`;
    if (play) {
      url = `${url}/play`;
    }
    navigate(url, { state: { noScroll: true }, replace: true });
  }, [data.index, navigate, play]);

  const prev = useCallback(() => {
    const song = trackList[data.index - 1]?.slug;
    let url = `/our-music/hollow/${song}`;
    if (play) {
      url = `${url}/play`;
    }
    navigate(url, { state: { noScroll: true }, replace: true });
  }, [data.index, navigate, play]);

  const volumeChange = useCallback((e) => {
    dispatch(setPlayerVolume(e.target.volume));
  }, [dispatch]);

  const close = useCallback(() => {
    if (panelRef.current) {
      panelRef.current.classList.remove('album__lyrics-panel--show');
      setTimeout(() => {
        navigate('/our-music/hollow', { state: { noScroll: true } });
      }, 500);
      return;
    }
    navigate('/our-music/hollow', { state: { noScroll: true } });
  }, [navigate]);

  useEffect(() => {
    if (show && data.slug && data.title) {
      setPageTitle(`Song: ${data.title} by Annie in Black`, `${data.title} by Annie in Black from album Hollow`, `/our-music/hollow/${data.slug}`);
    } else {
      setPageTitle('Album: Hollow', 'Our music from album Hollow. Symphony of sorrow, my endless refrain...', `/our-music/hollow/${data.slug}`);
    }
  }, [data.slug, data.title, show]);

  return (
    <LyricsPanel slug={ data?.slug } close={ close }>
      <div className="album__lyrics-panel-nav">
        { data.index > 0 ? (<button onClick={ prev }>Previous</button>) : (<span>Previous</span>) }
        { data.index < 14 ? (<button onClick={ next }>Next</button>) : (<span>Next</span>) }
      </div>

      <div className="album__lyrics-panel-text">
        <Songs slug={ data?.slug } addSchema />
      </div>

      { data?.slug && (
        <div className="album__lyrics-player">
          <AudioPlayer
            autoPlay={ play === true }
            src={ data.src }
            showSkipControls={ false }
            showDownloadProgress={ false }
            showFilledVolume={ true }
            hasDefaultKeyBindings={ false }
            loop={ false }
            preload="metadata"
            volume={ volume }
            onVolumeChange={ volumeChange }
            volumeJumpStep={ 0.1 }
            onPlay={ () => {
              trackPlay(data?.title);
            } }
            customIcons={{
              play: <FaPlay />,
              pause: <FaPause />,
              volume: <FaVolumeUp />,
              volumeMute: <FaVolumeMute />,
              rewind:   <Empty />,
              forward:  <Empty />,
              previous: <Empty />,
              next:     <Empty />,
              loop:    <Empty />,
              loopOff: <Empty />
            }}
          />
        </div>
      ) }
    </LyricsPanel>
  );
};

const HomePage = () => {
  return (
    <div className="album">
      <PageTitle/>
      <SongListener/>
      <LyricsAndPlayer/>
      <PageHeader/>
      <PageContent/>
    </div>
  );
};

export default HomePage;
