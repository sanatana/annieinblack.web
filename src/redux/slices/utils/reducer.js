import * as types from './types';

const initialState = {
  stackedToast: null,
  toast: {
    show: false,
    type: null,
    message: null,
  },
  modal: {
    show: false,
    type: null,
    data: null,
  },
  app: {
    hideContent: null,
  },
  temp: {},
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SHOW_STACKED_TOAST: {
      return {
        ...state,
        stackedToast: {
          message: action.payload.message,
          show: true,
          type: action.payload.type || initialState.toast.type,
        },
      };
    }

    case types.SHOW_MODAL: {
      return {
        ...state,
        modal: {
          ...state.modal,
          previousModal: action.payload.savePrevious === true ? {
            show: state.modal.show,
            type: state.modal.type,
            data: state.modal.data,
          } : null,
          show: true,
          type: action.payload.type,
          data: action.payload.data || null,
        }
      };
    }

    case types.HIDE_MODAL: {
      return {
        ...state,
        modal: {
          ...state.modal,
          show: false,
          type: null,
          data: null,
        }
      };
    }

    case types.SET_TEMP_UTIL_VALUE: {

      if (!action.payload.key) {
        return {
          ...state,
        };
      }

      if (action.payload.data === null) {
        const updateValue = {
          ...state.temp,
        };

        if (updateValue[action.payload.key]) {
          delete updateValue[action.payload.key];
        }

        return {
          ...state,
          temp: updateValue,
        };
      }

      return {
        ...state,
        temp: {
          ...state.temp,
          [action.payload.key]: action.payload.data,
        },
      };
    }

    case types.SET_SHOW_HIDE_PAGE_CONTENT: {
      return {
        ...state,
        app: {
          ...state.app,
          hideContent: action.payload.show === true ? Date.now() : null,
        }
      };
    }

    default:
      return state;
  }
};

export default reducer;
