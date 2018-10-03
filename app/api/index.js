// @flow
import axios from 'axios';
import { url } from '../config/api';

export async function getMovieSuggestions(id: number) {
  const response = await axios.get(`${url}movie_suggestions.json`, {
    params: {
      movie_id: id
    }
  });

  return response.data;
}

export async function getMovieDetails(id: number) {
  const response = await axios.get(`${url}movie_details.json`, {
    params: {
      movie_id: id,
      with_images: true,
      with_cast: true
    }
  });

  return response.data;
}

export async function getMoviesList(options) {
  const response = await axios.get(`${url}list_movies.json`, {
    params: {
      ...options,
      with_rt_ratings: true
    }
  });

  return response.data;
}
