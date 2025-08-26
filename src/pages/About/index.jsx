import setPageTitle from '@src/helpers/html/set_page_title';
import AnnieInBlack from '@src/assets/logos/annie-in-black.png';
import { useEffect } from 'react';
import { Video } from '@src/components';

import './about.scss';

const PageTitle = () => {

  useEffect(() => {
    setPageTitle('About us', 'who is Annie in Black?', '/about-us');
  }, []);

  return null;
};

const HomeHeader = () => {
  return (
    <section className="about__hero">
      <Video/>

      <div className="about__hero-content">
        <h1 className="h1__title">About us</h1>
        <h2>Who we are? How we got here?</h2>
      </div>
    </section>
  );
};

const HomePageContent = () => {

  return (
    <div className="about__content">
      <div className="about__content-1">
      </div>

      <article className="about__content-2">
        <img src={ AnnieInBlack } alt="Annie In Black"/>

        <p>Annie in Black began as a handful of childhood friends who first picked up instruments together. Back then it
          was noisy rehearsals in garages and attics, learning how to turn feelings into sound, and dreaming bigger than
          the small towns we grew up in. Life, as it often does, pulled us apart — careers, families, responsibilities —
          until the music became a memory of youth.</p>

        <p>Years later, scattered across different countries, we found our way back to each other — not just to relive
          the
          past, but because the weight of time had changed us. Technology became the bridge, letting us share ideas,
          fragments of riffs, and late-night lyrics across borders until songs began to form again. Along the road, we
          lost friends — some who once stood beside us in those first versions of the band — to struggles with mental
          health and to the cruelty of cancer. Their absence left a silence we couldn’t ignore, a silence that pushed us
          to write again, this time with a different purpose.</p>

        <p>Annie in Black is not just a reunion — it’s an imprint of grief, memory, and the fragile resilience we carry.
          Our music channels what words alone can’t say: the heaviness of loss, the haunting pull of memory, and the
          dark beauty in facing those shadows instead of running from them.</p>

        <p>Through atmospheric guitars, haunting melodies, and lyrics born from real pain, we try to create songs that
          linger — not polished escapes, but raw fragments of truth. Each track is a way of preserving the people and
          moments that shaped us, and of connecting with anyone who has faced their own battles in silence.</p>

        <p>We don’t pretend to offer easy answers. What we do is carve something honest from the noise: music that
          speaks to the weight of memory, the sting of absence, and the small defiance of creating words where once
          there was only silence.</p>
      </article>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="about">
      <PageTitle/>
      <HomeHeader/>
      <HomePageContent/>
    </div>
  );
};

export default HomePage;
