// @flow
import { faEye, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ImdbLogo from '../../assets/images/logo-imdb.svg';
import MovieList from '../../movies/containers/movies';
import styles from './movie-details.sass';

type Props = {
  movie: {
    id: number,
    background_image: string,
    large_cover_image: string,
    medium_cover_image: string,
    title_long: string,
    genres: [],
    description_full: string,
    rating: number,
    mpa_rating: string,
    date_uploaded?: string,
    torrents: [],
    medium_screenshot_image1: string,
    medium_screenshot_image2: string,
    medium_screenshot_image3: string,
    slug: string,
    yt_trailer_code: string,
    cast?: []
  },
  suggestions: ?[]
};

const MovieDetails = ({ movie, suggestions }: Props) => (
  <div
    className={styles.MovieContainer}
    style={{ backgroundImage: `url(${movie.background_image})` }}
  >
    <Tabs>
      <TabList className={styles.TabList}>
        <Tab>General View</Tab>
        <Tab>Details</Tab>
        {suggestions && <Tab>Suggestions</Tab>}
      </TabList>

      <TabPanel className={styles.TabPanel}>
        <div className={styles.Content}>
          <div className={styles.Info}>
            <h1 className={styles.title}>{movie.title_long}</h1>
            <div className={styles.genres}>
              {movie.genres.map(genre => (
                <span key={genre.uuid}>{genre.name}</span>
              ))}
            </div>
            <p className={styles.description}>{movie.description_full}</p>
            <div className={styles.rating}>
              <img src={ImdbLogo} alt="IMDb Rating" />
              <span>{movie.rating}</span>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            {movie.mpa_rating && (
              <p className={styles.mpaRating}>
                <FontAwesomeIcon icon={faEye} />
                <span style={{ marginLeft: '10px' }}>{movie.mpa_rating}</span>
              </p>
            )}
            <div className={styles.PlayButtons} style={{ marginTop: '20px' }}>
              {movie.torrents.map(torrent => (
                <Link to={`/player/${torrent.hash}`} key={torrent.hash}>
                  <div className={styles.PlayButton}>
                    <span>Play {torrent.quality}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className={styles.Sidebar}>
            <img
              src={movie.large_cover_image}
              alt={movie.title_long}
              className={styles.Poster}
            />
          </aside>
        </div>
      </TabPanel>

      <TabPanel className={styles.TabPanel}>
        <div className={styles.Content}>
          <div className={styles.ContentWrapper}>
            <div className={styles.Info} style={{ marginRight: '30px' }}>
              <h2 className={styles.DetailsTitle}>Trailer</h2>
              <iframe
                title={movie.title_long}
                style={{
                  width: '100%',
                  height: '60vh'
                }}
                src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                frameBorder="0"
                allowFullScreen
              />
            </div>

            <aside className={styles.Sidebar}>
              {movie.cast && (
                <div>
                  <h2 className={styles.DetailsTitle}>Cast</h2>
                  <div className={styles.Cast}>
                    <ul>
                      {movie.cast.map(actor => (
                        <li key={actor.imdb_code}>
                          <img
                            src={
                              actor.url_small_image ||
                              'https://yts.am/assets/images/actors/thumb/default_avatar.jpg'
                            }
                            alt={actor.name}
                          />
                          <p>
                            {actor.name}
                            {actor.character_name && (
                              <span>
                                {' '}
                                as <b>{actor.character_name}</b>
                              </span>
                            )}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div>
                <h2 className={styles.DetailsTitle}>Info</h2>
                <div className={styles.TorrentInfo}>
                  <ul>
                    {movie.torrents.map(torrent => (
                      <li key={torrent.hash}>
                        <p className={styles.Quality}>{torrent.quality}</p>
                        <p>{torrent.size}</p>
                        <p className={styles.DateAdded}>
                          {moment(torrent.date_uploaded).format(
                            'MMM Do YYYY, h:mm:ss a'
                          )}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {movie.date_uploaded && (
                  <p className={styles.dateAdded}>
                    <span>Date uploaded</span>
                    <br />
                    {moment(movie.date_uploaded).format(
                      'MMMM Do YYYY, h:mm:ss a'
                    )}
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </TabPanel>

      {suggestions && (
        <TabPanel className={styles.TabPanel}>
          <div className={styles.Content} style={{ flexDirection: 'column' }}>
            <MovieList movies={suggestions} perLine={4} />
          </div>
        </TabPanel>
      )}
    </Tabs>
  </div>
);

export default MovieDetails;
