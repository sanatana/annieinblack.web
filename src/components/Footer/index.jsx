import './footer.scss';

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

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__content-flex">
          <div>
            <h3>Annie in Black</h3>
            <p>
              Annie in Black is an experimental rock band blending emotional depth with melodic intensity.
              With heartfelt lyrics, atmospheric guitars, and powerful vocals, their music explores loss, sorrow,
              and inner conflict in songs that are haunting and raw.
            </p>
          </div>

          <div className="footer__content-socials">
            <h3>Connect with us</h3>
            <div className="footer__content-socials-links">
              <a href="https://www.facebook.com/annieinblack" target="_blank" rel="nofollow noopener noreferrer">f</a>
              <a href="https://music.youtube.com/???" target="_blank" rel="nofollow noopener noreferrer">Y</a>
            </div>

            <div>
              <Coffee/>
            </div>
          </div>

        </div>
      </div>

      <div className="footer__copy">
        &copy; { new Date().getFullYear() } Annie in Black. | Privacy policy
      </div>
    </footer>
  );
};
