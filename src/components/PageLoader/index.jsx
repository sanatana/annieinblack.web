import { Suspense } from 'react';
import Loading from '../LoadingIndicator';

import './page_loader.scss';

const PageLazyLoader = (Component) => (props) => {
  return (
    <Suspense fallback={
      <>
        <div className="page__loader--loading">
          <div>
            <img src="/assets/images/annie-in-black.png" alt="Annie in Black"/>
            <Loading/>
          </div>
        </div>
      </>
    }>
      { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
      <Component { ...props } />
    </Suspense>
  );
};

export default PageLazyLoader;
