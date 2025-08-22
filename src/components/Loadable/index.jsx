import { Suspense } from 'react';
import Loading from '../LoadingIndicator';

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={ <Loading /> }>
      { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
      <Component { ...props } />
    </Suspense>
  );
};

export default Loadable;
