import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createStore } from '@src/redux/Store'; // 👈 use the named export only
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.jest.cjs';

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function render(
  ui,
  {
    preloadedState,
    route = '/', // default route
    path = '/', // route path pattern for useParams
    additionalRoutes = [],
    store = createStore(preloadedState),
    ...renderOptions
  } = {},
) {
  const Wrapper = ({ children }) => (
    <Provider store={ store }>
      <I18nextProvider i18n={ i18n }>
        <MemoryRouter initialEntries={ [route] }>
          <Routes>
            <Route path={ path } element={ children } />
            {
              additionalRoutes.map(({ path: routePath, element }) => (
                <Route key={ routePath } path={ routePath } element={ element } />
              ))
            }
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    </Provider>
  );

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export * from '@testing-library/react';
export { render, userEvent, sleep, escapeRegex };
