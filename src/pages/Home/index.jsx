import setPageTitle from '@src/helpers/html/set_page_title';
import AnnieInBlack from '@src/assets/logos/annie-in-black.png';
import { useEffect } from 'react';

import './home_page.scss';
import AudioPlayer from '@src/pages/Home/partial/AudioPlayer';

const PageTitle = () => {

  useEffect(() => {
    setPageTitle(null, 'experimental rock band blending emotional depth with melodic intensity', '/');
  }, []);

  return null;
};

const HomeHeader = () => {
  return (
    <section className="home-page__hero">
      <video loop muted autoPlay playsInline poster="/assets/images/hero__001.jpg" className="home-page__hero-video">
        <source src="/assets/video/annie.mp4" type="video/mp4" />
        <source src="/assets/video/annie.webm" type="video/webm" />
      </video>

      <div className="home-page__hero-content">
        <h1>Annie in Black</h1>
        <img src={ AnnieInBlack } alt="Annie In Black" />
        <p>soundtracks of loss, regrets and sorrow — dark, honest &amp; true</p>
      </div>
    </section>
  );
};

const hollowTracks = [
  {
    title: 'I Remember (Preview)',
    artist: 'Annie in Black',
    cover: '/assets/audio/album/hollow/cover.jpg',
    src: '/assets/audio/album/hollow/001.mp3', // MP3 only
    duration: 66
  },
  {
    title: 'Hollow (Preview)',
    artist: 'Annie in Black',
    cover: '/assets/audio/album/hollow/cover.jpg',
    src: '/assets/audio/album/hollow/002.mp3', // MP3 only
    duration: 32
  },
  {
    title: 'You were never there (Preview)',
    artist: 'Annie in Black',
    cover: '/assets/audio/album/hollow/cover.jpg',
    src: '/assets/audio/album/hollow/003.mp3', // MP3 only
    duration: 34
  },
  {
    title: 'Paper dragons (Preview)',
    artist: 'Annie in Black',
    cover: '/assets/audio/album/hollow/cover.jpg',
    src: '/assets/audio/album/hollow/004.mp3', // MP3 only
    duration: 31
  },
  {
    title: 'Truth hurts (Preview)',
    artist: 'Annie in Black',
    cover: '/assets/audio/album/hollow/cover.jpg',
    src: '/assets/audio/album/hollow/005.mp3', // MP3 only
    duration: 34
  },
  {
    title: 'Glass crown (Preview)',
    artist: 'Annie in Black',
    cover: '/assets/audio/album/hollow/cover.jpg',
    src: '/assets/audio/album/hollow/006.mp3', // MP3 only
    duration: 31
  },
  {
    title: 'Echos of your name (Preview)',
    artist: 'Annie in Black',
    cover: '/assets/audio/album/hollow/cover.jpg',
    src: '/assets/audio/album/hollow/007.mp3', // MP3 only
    duration: 32
  },
  {
    title: 'How many more? (Preview)',
    artist: 'Annie in Black',
    cover: '/assets/audio/album/hollow/cover.jpg',
    src: '/assets/audio/album/hollow/008.mp3', // MP3 only
    duration: 39
  },
  {
    title: 'Footprints (Preview)',
    artist: 'Annie in Black',
    cover: '/assets/audio/album/hollow/cover.jpg',
    src: '/assets/audio/album/hollow/009.mp3', // MP3 only
    duration: 45
  },
  {
    title: 'We will dance again (Preview)',
    artist: 'Annie in Black',
    cover: '/assets/audio/album/hollow/cover.jpg',
    src: '/assets/audio/album/hollow/010.mp3', // MP3 only
    duration: 34
  },
  {
    title: 'Tears of silence (Preview)',
    artist: 'Annie in Black',
    cover: '/assets/audio/album/hollow/cover.jpg',
    src: '/assets/audio/album/hollow/011.mp3', // MP3 only
    duration: 37
  },
  {
    title: 'Monsters in the shadows (Preview)',
    artist: 'Annie in Black',
    cover: '/assets/audio/album/hollow/cover.jpg',
    src: '/assets/audio/album/hollow/012.mp3', // MP3 only
    duration: 36
  },
  {
    title: 'How many more? (Acoustic) (Preview)',
    artist: 'Annie in Black',
    cover: '/assets/audio/album/hollow/cover.jpg',
    src: '/assets/audio/album/hollow/013.mp3', // MP3 only
    duration: 48
  },
  {
    title: 'Whisper in the storm (Preview)',
    artist: 'Annie in Black',
    cover: '/assets/audio/album/hollow/cover.jpg',
    src: '/assets/audio/album/hollow/014.mp3', // MP3 only
    duration: 36
  },
  {
    title: 'Tomorrow (Preview)',
    artist: 'Annie in Black',
    cover: '/assets/audio/album/hollow/cover.jpg',
    src: '/assets/audio/album/hollow/015.mp3', // MP3 only
    duration: 43
  }
];

const NewRelease = () => {
  return (
    <section className="new-release">
      <h2>New release</h2>
      <p>
        A 15-track journey through isolation, loss, sorrow, and resilience.
        From sleepless nights and haunting memories to raw reflections on loss and war,
        Hollow blends dark honesty with atmospheric guitars and powerful vocals.
        Songs that echo pain, but still search for meaning in the dark.
      </p>
      <article>
        <img src="/assets/images/annie-in-black-hollow.jpg" alt="Annie In Black - Hollow" />

        <div className="new-release__play-list">
          <AudioPlayer tracks={ hollowTracks } />
        </div>
      </article>

      <div>
        <p>Available now on: </p>
        <div className="new-release__links">
          <a target="_blank" rel="nofollow noopener noreferrer" href="https://open.spotify.com/album/0l4vbw7bPxNVOwUyx2RaRL">Spotify</a>
          <a target="_blank" rel="nofollow noopener noreferrer" href="https://www.amazon.com/dp/B0FN5DXJJ2">Amazon</a>
          <a target="_blank" rel="nofollow noopener noreferrer" href="https://itunes.apple.com/album/id1834542160?ls=1&app=itunes">iTunes</a>
          <a target="_blank" rel="nofollow noopener noreferrer" href="https://music.youtube.com/watch?v=AnpA--zGgT4&list=OLAK5uy_mQSyoPMgglQXTsafZ951L1ufkxpxJkq08">YouTube music</a>
          <a target="_blank" rel="nofollow noopener noreferrer" href="https://annieinblack.bandcamp.com/album/hollow">BandCamp</a>
        </div>
      </div>
    </section>
  );
};

const HomePageContent = () => {

  return (
    <div className="home-page__content">
      <NewRelease />
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="home-page">
      <PageTitle/>
      <HomeHeader/>
      <HomePageContent />
    </div>
  );
};

export default HomePage;
