import { Video } from '@src/components';

import './hero.scss';

const Hero = ({ children }) => {
  return (
    <section className="hero">
      <Video/>

      { children ? (
        <div className="hero__content">
          { children }
        </div>
      ) : null }

    </section>
  );
};

export default Hero;
