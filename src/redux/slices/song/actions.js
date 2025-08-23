import * as types from './types';

const showSong = (songObject, play = false, index = 0) => (dispatch) => {
  dispatch({
    type: types.SHOW_SONG_PREVIEW,
    payload: { song: {
      ...songObject,
      title: songObject.title.replace(/\(Preview\)/i, ''),
      index,
    }, play },
  });
};

const hideSong = () => (dispatch) => {
  dispatch({
    type: types.HIDE_SONG_PREVIEW,
  });
};

const setPlayerVolume = (v) => (dispatch) => {
  const volume = parseFloat(v.toFixed(1));
  sessionStorage.setItem('annie-in-black__volume', volume.toString());

  dispatch({
    type: types.SET_PLAYER_VOLUME,
    payload: {
      volume: volume,
    }
  });
};

const hydratePlayerVolume = () => (dispatch) => {

  let volume = parseFloat(sessionStorage.getItem('annie-in-black__volume')) ?? 0.4;
  volume = parseFloat(volume.toFixed(2));

  console.log('HYDRATE', volume.toString());

  dispatch({
    type: types.SET_PLAYER_VOLUME,
    payload: {
      volume: volume,
    }
  });
};

export {
  showSong,
  hideSong,
  setPlayerVolume,
  hydratePlayerVolume,
};
