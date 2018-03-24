import axios from 'axios';
import uuid from 'uuid/v4';
import {
  IS_LOADING,
  UPDATE_CURRENT_MOVIE,
  UPDATE_DOCUMENT_TITLE,
  UPDATE_MOVIES_LIST,
  SEARCH_MOVIES,
  OPEN_MODAL,
  CLOSE_MODAL
} from '../action-types';
import { url } from '../config/api';


export function openModal() {
  return {
    type: OPEN_MODAL
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}

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

export function updateMoviesList(movies) {
  return {
    type: UPDATE_MOVIES_LIST,
    payload: {
      movies
    }
  };
}

export function updateSearchList(result) {
  return {
    type: SEARCH_MOVIES,
    payload: {
      result
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
      let genres = [];
      let torrents = [];

      if (movie.genres) {
        genres = movie.genres.map(genre => ({
          name: genre,
          uuid: uuid()
        }));
      }

      if (movie.torrents) {
        ({ torrents } = movie);
      }

      movie.genres = genres;
      movie.torrents = torrents;
      movie.subtitles = [];

      dispatch(isLoading(false));
      dispatch(updateWindowTitle(`${movie.title_long} - Priv`));
      dispatch(updateCurrentMovie(movie));
      return true;
    }).catch(err => console.error(err, 'ERROR'));
  };
}

export function findMoviesList(options = {}) {
  return dispatch => {
    dispatch(isLoading(true));

    axios.get(`${url}/list_movies.json`, {
      params: {
        ...options,
        with_rt_ratings: true
      }
    }).then(res => {
      let movies = [];
      if (res.data.data.movie_count > 0) {
        ({ movies } = res.data.data);
      }

      dispatch(isLoading(false));
      dispatch(updateMoviesList(movies));
      return true;
    }).catch(err => console.error(err, 'ERROR'));
  };
}

export function searchMovies(options = {}) {
  return dispatch => {
    dispatch(isLoading(true));

    axios.get(`${url}/list_movies.json`, {
      params: {
        ...options,
        with_rt_ratings: true
      }
    }).then(res => {
      let movies = [];
      if (res.data.data.movie_count > 0) {
        ({ movies } = res.data.data);
      }

      dispatch(isLoading(false));
      dispatch(updateSearchList(movies));
      return true;
    }).catch(err => console.error(err, 'ERROR'));
  };
}
