import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import * as reducers from './slices';
import { hydratePlayerVolume } from '@src/redux/slices/song/actions';

const RootReducer = combineReducers({
  ...reducers,
});

export const createStore = (preloadedState) =>
  configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.REACT_APP_ENABLE_DEV_TOOL === 'true',
    preloadedState,
  });

const Store = configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
  devTools: process.env.REACT_APP_ENABLE_DEV_TOOL === 'true',
});

Store.dispatch(hydratePlayerVolume());

export default Store;
