import { useEffect } from 'react';

const Copy = () => {
  return (
    <div className="copy">&copy; 2025 Annie in Black, all rights reserved.</div>
  );
};

const Author = ({ children }) => {
  return (
    <div className="author">Author: { children }</div>
  );
};

const Goddess = () => {
  return (
    <article>
      <h2>Goddess of Spring</h2>
      <Author>Sebastian Stadler</Author>
      <Copy/>
      In the gardens of dawn, a blossom awake,<br/>
      A goddess of spring, unfurled in the light.<br/>
      The beauty, she stood, none other her make,<br/>
      A bloom, pure, whether by day or the night.<br/><br/>

      The sweetest fragrance, a whisper of joy,<br/>
      dancing in breezes under heaven&apos;s blue dome.<br/>
      In each tender fold, life&apos;s tale is complete,<br/>
      In her heart, a world, forever a home.<br/><br/>

      Yet, flowers, though fair, must wither and fade,<br/>
      Their time in the sun - a fleeting embrace.<br/>
      In the twilight, her glow begins to fade,<br/>
      Leaving memories time will never erase.<br/><br/>

      In petals that fall, her spirit still flies,<br/>
      A lovely flower never truly dies.

      <div className="dedication dedication-bottom">
        To Vesna — my high school sweetheart, my first love, my first kiss.
        You left us far too soon.
        You’ll always have a place in my heart, and always be a part of me.

        <small>
          ** Vesna is the Slavic goddess of spring, youth, fertility,
          and love, a figure of rejuvenation and abundance who brings warmth and life after winter.
        </small>
      </div>
    </article>
  );
};

const Delight = () => {
  return (
    <article>
      <h2>Mother&apos;s delight</h2>
      <Author>Sebastian Stadler</Author>
      <Copy/>
      In the warmth of morning dawn, a new life awaits,<br/>
      each breath, a promise of hope gently creates.<br/>
      A fragile flower, hidden, yet to be seen,<br/>
      waiting in silence for a future serene.<br/><br/>

      Moonlight fading, quiet end of the night,<br/>
      songs and fairy tales in the morning light.<br/>
      A tiny seed, hidden, waiting for its hour,<br/>
      for not too long now, will bloom into a flower.<br/><br/>

      The wind whispers and carries her dreams,<br/>
      through valleys deep and deep mountain streams.<br/>
      In every gust, life&apos;s story is told,<br/>
      a hope of the world where her love shall unfold.<br/><br/>

      The future ahead, a clean canvas bright,<br/>
      a tiny flower, mother&apos;s most pure delight.<br/>
      Each heartbeat, a song, a sweet dance divine,<br/>
      the bond grows stronger with the passing of time.<br/><br/>

      Dear mother, stand strong, be proud,<br/>
      for you gave a gift to the whole of humankind.

      <div className="dedication dedication-bottom">
        To Hannah — For a brave soul who carried both dreams and new life quietly, unsure how the world might
        understand. This is for the strength it takes to nurture hope in silence, and for the courage that one day turns
        whispers into light.
      </div>
    </article>
  );
};

const Poems = ({ slug }) => {
  switch (slug) {

    case 'goddess-of-spring':
      return (
        <Goddess/>
      );

    case 'mothers-delight':
      return (
        <Delight/>
      );

    default:
      return null;
  }
};

export default Poems;
