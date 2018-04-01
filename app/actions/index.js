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
import {
  getMovieDetails,
  getMoviesList
} from '../api';

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

export const findMovieDetails = (id: string) => async dispatch => {
  dispatch(isLoading(true));

  try {
    const response = await getMovieDetails(parseInt(id, 10));
    const { movie } = response.data;
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
  } catch (e) {
    console.log(e, 'ERROR getMovieDetails ON actions');
  }
};

export const findMoviesList = (options = {}) => async dispatch => {
  dispatch(isLoading(true));

  try {
    const response = await getMoviesList(options);

    let movies = [];
    if (response.data.movie_count > 0) {
      ({ movies } = response.data);
    }

    dispatch(isLoading(false));
    dispatch(updateMoviesList(movies));
  } catch (e) {
    console.log(e, 'ERROR findMoviesList ON actions');
  }
};

export const searchMovies = (options = {}) => async dispatch => {
  dispatch(isLoading(true));

  try {
    const response = await getMoviesList(options);

    let movies = [];
    if (response.data.movie_count > 0) {
      ({ movies } = response.data);
    }

    dispatch(isLoading(false));
    dispatch(updateSearchList(movies));
  } catch (e) {
    console.log(e, 'ERROR searchMovies ON actions');
  }
};
