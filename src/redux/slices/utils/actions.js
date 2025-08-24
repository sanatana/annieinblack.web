import * as types from './types';
import CustomStore from '@src/helpers/storage';
import { storage as storageConfig } from '@src/config';
import { sendApiContactForm } from '@src/helpers/forms/form.helper';

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

const sendContactForm = (data) => async () => {
  return sendApiContactForm(data);
};

const setTempUtilValue = (name, value) => (dispatch) => {
  dispatch({
    type: types.SET_TEMP_UTIL_VALUE,
    payload: { key: name, data: value },
  });
};

const getTempUtilValue = (name) => (dispatch, getState) => {
  const { temp } = getState().utils;
  return temp?.[name] || null;
};

export {
  showStackedToast,
  showNotification,
  showErrorNotification,
  showModal,
  hideModal,
  clearNotAuthorisedError,
  sendContactForm,
  setTempUtilValue,
  getTempUtilValue,
};
