import setPageTitle from '@src/helpers/html/set_page_title';
import AnnieInBlack from '@src/assets/logos/annie-in-black.png';
import AudioPlayer from '@src/pages/Home/partial/AudioPlayer';
import { useEffect } from 'react';
import hollowTracks from '@src/data/hollow';
import { InternalLink, Video } from '@src/components';

import './home_page.scss';
import { trackExternalLink } from '@src/helpers/stats';

const PageTitle = () => {

  useEffect(() => {
    setPageTitle(null, 'experimental rock band blending emotional depth with melodic intensity', '/');
  }, []);

  return null;
};

const HomeHeader = () => {
  return (
    <section className="home-page__hero">
      <Video />

      <div className="home-page__hero-content">
        <h1>Annie in Black</h1>
        <img src={ AnnieInBlack } alt="Annie In Black" />
        <p>soundtracks of loss, sorrow and regrets - dark, honest &amp; true</p>
      </div>
    </section>
  );
};

const NewRelease = () => {
  return (
    <section className="new-release">
      <h2>New release</h2>
      <p>August 22nd, 2025</p>
      <p className="new-release__intro">
        <b>Hollow</b> is a 15-track journey through isolation, loss, sorrow, and resilience.
        From sleepless nights and haunting memories to raw reflections on loss, grief, war and struggles too heavy to carry.
        Hollow blends dark honesty with atmospheric guitars and powerful vocals.
        Songs that echo pain, but still somehow search for meaning in the dark.<br />

        <InternalLink to={ `/our-music/hollow` }>Behind Hollow + lyrics</InternalLink>
      </p>
      <article>
        <img className="cover" src="/assets/images/annie-in-black-hollow.jpg" alt="Annie In Black - Hollow" />

        <div className="new-release__play-list">
          <AudioPlayer tracks={ hollowTracks } />
        </div>
      </article>

      <div className="new-release__links-wrapper">
        <p>Now available on:</p>
        <div className="new-release__links">
          <a onClick={ trackExternalLink } target="_blank" rel="nofollow noopener noreferrer" href="https://open.spotify.com/album/0l4vbw7bPxNVOwUyx2RaRL">Spotify</a>
          <a onClick={ trackExternalLink } target="_blank" rel="nofollow noopener noreferrer" href="https://www.amazon.com/dp/B0FN5DXJJ2">Amazon</a>
          <a onClick={ trackExternalLink } target="_blank" rel="nofollow noopener noreferrer" href="https://itunes.apple.com/album/id1834542160?ls=1&app=itunes">iTunes</a>
          <a onClick={ trackExternalLink } target="_blank" rel="nofollow noopener noreferrer" href="https://music.youtube.com/watch?v=AnpA--zGgT4&list=OLAK5uy_mQSyoPMgglQXTsafZ951L1ufkxpxJkq08">YouTube music</a>
          <a onClick={ trackExternalLink } target="_blank" rel="nofollow noopener noreferrer" href="https://annieinblack.bandcamp.com/album/hollow">BandCamp</a>
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
