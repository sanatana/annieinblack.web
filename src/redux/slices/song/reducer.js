import * as types from './types';

const initialState = {
  data: {
    src: null,
    title: null,
    duration: null,
    songDuration: null,
    slug: null,
    index: -1,
  },
  play: false,
  show: false,
  volume: 0.5,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case types.SHOW_SONG_PREVIEW: {
      return {
        ...state,
        data: {
          ...action.payload.song || {},
        },
        show: true,
        play: action.payload.play === true,
      };
    }

    case types.HIDE_SONG_PREVIEW: {
      const temp = { ...state };
      return {
        ...initialState,
        volume: temp.volume ?? initialState.volume,
      };
    }

    case types.SET_PLAYER_VOLUME: {
      return {
        ...state,
        volume: action.payload.volume,
      };
    }

    default:
      return state;
  }
};

export default reducer;
