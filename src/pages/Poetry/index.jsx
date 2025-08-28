import { Hero, InternalLink, Loadable, LyricsPanel } from '@src/components';

import './poetry.scss';

import list from '@src/data/poetry';
import { lazy, useCallback, useEffect } from 'react';
import setPageTitle from '@src/helpers/html/set_page_title';
import { useNavigate, useParams } from 'react-router-dom';

const Poems = Loadable(lazy(() => import('@src/pages/Poetry/partial/Poems')));

const setDefaultTitle = () => {
  setPageTitle('Our Poetry', 'Words that linger when the music falls silent...');
};

const PoemListener = () => {
  const { poem } = useParams();
  const navigate = useNavigate();

  const close = useCallback(() => {
    navigate('/our-poetry', { state: { noScroll: true }, replace: true });
  }, [navigate]);

  useEffect(() => {
    if (poem) {
      const allowedSlugs = list.map((item) => item.slug);
      if (allowedSlugs.indexOf(poem) === -1) {
        navigate('/our-poetry', { state: { noScroll: true }, replace: true });
        setDefaultTitle();
      } else {
        const targetPoem = list.find((item) => item.slug === poem);
        setPageTitle(
          `Poem: ${targetPoem.title}`,
          targetPoem.seoDescription || `Words that linger when the music falls silent...`,
        );
      }
    } else {
      setDefaultTitle();
    }
  }, [poem, navigate]);

  return (
    <LyricsPanel slug={ poem } close={ close }>
      <Poems slug={ poem }/>
    </LyricsPanel>
  );
};

const PoetryList = () => {
  const navigate = useNavigate();

  const goTo = useCallback((e, slug) => {
    e.preventDefault();
    navigate(slug, { state: { noScroll: true } });
  }, [navigate]);

  return (
    <ul className="poetry__content-list">
      {
        list.map((poem, index) => (
          <li key={ poem.slug }>
            <span>{ index + 1 }.</span>
            <InternalLink onClick={ (e) => goTo(e, `/our-poetry/${poem.slug}`) }
              to={ `/our-poetry/${poem.slug}` }>{ poem.title }</InternalLink>
          </li>
        ))
      }

      <li className="end">... more to come</li>
    </ul>
  );
};

const Poetry = () => {
  return (
    <div>
      <Hero>
        <h1 className="h1__title">Our Poetry</h1>
        <h2>Words that linger when the music falls silent...</h2>
      </Hero>

      <div className="poetry__content">
        <div className="poetry__content-1"/>
        <div className="poetry__content-2">

          <p>Not every line we write becomes a song. Some remain as fragments—moments of grief, memory, or reflection
            that stand on their own. These words are raw and unpolished, carrying the same spirit as our music but
            without the weight of melody.</p>

          <p>The Poetry Corner is where we gather them: verses born in quiet hours, sometimes written simply to exist as
            poems, texts, stories or just ideas. They carry their own voice—shaped by loss, love, and the shadows we walk through.</p>
          <PoetryList/>
          <PoemListener/>
        </div>
      </div>
    </div>
  );
};

export default Poetry;
