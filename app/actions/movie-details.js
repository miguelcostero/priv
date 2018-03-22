import axios from 'axios';
import uuid from 'uuid/v4';
import {
  IS_LOADING,
  UPDATE_CURRENT_MOVIE,
  UPDATE_DOCUMENT_TITLE
} from '../action-types';
import { url } from '../config/api';

export function isLoading(value) {
  return {
    type: IS_LOADING,
    payload: {
      value
    }
  };
}

export function updateCurrentMovie(movie) {
  return {
    type: UPDATE_CURRENT_MOVIE,
    payload: {
      movie
    }
  };
}

export function updateWindowTitle(value: string) {
  return {
    type: UPDATE_DOCUMENT_TITLE,
    payload: {
      value
    }
  };
}

export function getMovieDetails(id: string) {
  return dispatch => {
    dispatch(isLoading(true));

    axios.get(`${url}/movie_details.json`, {
      params: {
        movie_id: id,
        with_images: true,
        with_cast: true
      }
    }).then(res => {
      const { movie } = res.data.data;
      const genres = movie.genres.map(genre => ({
        name: genre,
        uuid: uuid()
      }));
      movie.genres = genres;
      movie.subtitles = {};

      dispatch(isLoading(false));
      dispatch(updateWindowTitle(`${movie.title_long} - Priv`));
      dispatch(updateCurrentMovie(movie));
      return true;
    }).catch(err => console.error(err, 'ERROR'));
  };
}
