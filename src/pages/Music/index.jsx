import setPageTitle from '@src/helpers/html/set_page_title';
import { useEffect } from 'react';
import { InternalLink, Video } from '@src/components';

import './music.scss';

const PageTitle = () => {

  useEffect(() => {
    setPageTitle('Our music', 'What inspires us and how we create our music', '/our-music');
  }, []);

  return null;
};

const HomeHeader = () => {
  return (
    <section className="music__hero">

      <Video/>

      <div className="music__hero-content">
        <h1 className="h1__title">Our Music</h1>
        <h2>Echoes of loss, memory, and shadows</h2>
      </div>
    </section>
  );
};

const AlbumList = () => {

  return (
    <div>
      <h3>Music</h3>

      <ul className="music__list">
        <li>
          <InternalLink to={ `/our-music/hollow` }>
            <img src="/assets/images/annie-in-black-hollow.jpg" alt="music" />
            <div className="music__list-item">
              <b className="music__list-item-title">Hollow</b>
              <em>
                A 15-track journey through isolation, loss, sorrow, and resilience.
                From sleepless nights and haunting memories to raw reflections on loss and war,
                Hollow blends dark honesty with atmospheric guitars and powerful vocals.
                Songs that echo pain, but still search for meaning in the dark.
              </em>

              <p>Read more about the album &amp; lyrics</p>
            </div>
          </InternalLink>
        </li>
      </ul>
    </div>
  );
};

const HomePageContent = () => {

  return (
    <div className="music__content">
      <div className="music__content-1">

      </div>

      <div className="music__content-2">
        <p>Annie in Black is built on contrasts - fragile whispers against walls of sound, haunting melodies wrapped in
          raw intensity. Our music is less about escape and more about confrontation: confronting silence, grief, loss,
          and the shadows that follow us.</p>
        <p>
          Each song begins with lived experience - sleepless nights, memories of friends gone too soon, the weight of
          unspoken thoughts. From there it takes shape in atmospheric guitars, layered textures, and vocals that shift
          between vulnerable and fierce. The result is music that feels both intimate and immense, pulling the listener
          into a world where sorrow, regret, and fractured hope live side by side.
        </p>

        <AlbumList />

      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="music">
      <PageTitle/>
      <HomeHeader/>
      <HomePageContent/>
    </div>
  );
};

export default HomePage;
