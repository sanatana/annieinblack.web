import { Suspense } from 'react';
import Loading from '../LoadingIndicator';

import './page_loader.scss';

const PageLazyLoader = (Component) => (props) => {
  return (
    <Suspense fallback={
      <>
        <div className="page__loader--loading">
          <Loading />
        </div>
      </>
    }>
      { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
      <Component { ...props } />
    </Suspense>
  );
};

export default PageLazyLoader;
