import './footer.scss';

import fb from '@src/assets/logos/fb.svg';
import yt from '@src/assets/logos/youtube.svg';
import { InternalLink } from '@src/components';
import { useLocation } from 'react-router-dom';

const Coffee = () => {
  return (
    <a
      href="https://www.buymeacoffee.com/annieinblack"
      target="_blank"
      rel="noopener noreferrer"
      className="footer__coffee"
      aria-label="Buy me a coffee"
    >
      <img src="/assets/images/coffee.svg" alt="Coffee" /> <span>Buy us a coffee</span>
    </a>
  );
};

const MoraAboutUs = () => {
  const { pathname } = useLocation();
  if (pathname.includes('/about-us')) {
    return null;
  }

  return (
    <InternalLink to="/about-us">More about us</InternalLink>
  );
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__content-flex">
          <div className="footer__content-about">
            <h3>Annie in Black</h3>
            <p>
              Annie in Black is an experimental rock band blending emotional depth with melodic intensity.
              With heartfelt lyrics, atmospheric guitars, and powerful vocals, our music explores loss, sorrow,
              and inner conflict in songs that are haunting and raw.
              <br />
              <MoraAboutUs />
            </p>
          </div>

          <div className="footer__content-socials">
            <h3>Connect with us</h3>
            <div className="footer__content-socials-links">
              <a href="https://www.facebook.com/annieinblack" target="_blank" rel="nofollow noopener nimoreferrer noreferrer">
                <img src={ fb } alt="Annie in Black on Facebook" />
              </a>
              <a href="https://music.youtube.com/watch?v=AnpA--zGgT4&list=OLAK5uy_mQSyoPMgglQXTsafZ951L1ufkxpxJkq08" target="_blank" rel="nofollow noopener noreferrer">
                <img src={ yt } alt="Annie in Black on Youtube" />
              </a>
            </div>

            <div>
              <Coffee/>
            </div>
          </div>

        </div>
      </div>

      <div className="footer__copy">
        &copy; { new Date().getFullYear() } Annie in Black - All rights reserved. | <a href="/privacy-policy">Privacy policy</a>
      </div>
    </footer>
  );
};
