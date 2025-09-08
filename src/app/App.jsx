import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import Store from '../redux/Store';
import { injectStore } from '../helpers/axios';
import routes from '../routes';

import ErrorBoundary from '@src/components/ErrorBoundary';
import ScrollTracker from '@src/components/ScrollTracker';

import './App.scss';

injectStore(Store);

const App = () => {
  const content = useRoutes(routes);

  return (
    <Provider store={ Store }>
      <ScrollTracker />
      <ErrorBoundary>
        { content }
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
