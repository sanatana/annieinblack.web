import * as types from './types';
import CustomStore from '@src/helpers/storage';
import { storage as storageConfig } from '@src/config';

const customStore = new CustomStore();

const showStackedToast = (message, type = 'error') => (dispatch) => {
  dispatch({
    type: types.SHOW_STACKED_TOAST,
    payload: { message, type },
  });
};

const showNotification = (message, type = 'success') => (dispatch) => {
  dispatch({
    type: types.SHOW_STACKED_TOAST,
    payload: { message, type },
  });
};

const showErrorNotification = (message, type = 'error') => (dispatch) => {
  dispatch({
    type: types.SHOW_STACKED_TOAST,
    payload: { message, type },
  });
};

const showModal = (type, data = null) => (dispatch) => {
  dispatch({
    type: types.SHOW_MODAL,
    payload: { data, type },
  });
};

const hideModal = () => (dispatch) => {
  dispatch({
    type: types.HIDE_MODAL,
  });
};

const clearNotAuthorisedError = () => (dispatch) => {
  customStore.remove(storageConfig.NAMES.API_AUTHORISATION_ERROR);
  dispatch(hideModal());
};

export {
  showStackedToast,
  showNotification,
  showErrorNotification,
  showModal,
  hideModal,
  clearNotAuthorisedError,
};
