// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faStar, faEye } from '@fortawesome/fontawesome-free-solid';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
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
    cast: []
  },
  suggestions: ?[]
};

const MovieDetails = (props: Props) => (
  <div className={styles.MovieContainer} style={{ backgroundImage: `url(${props.movie.background_image})` }}>
    <Tabs>
      <TabList className={styles.TabList}>
        <Tab>General View</Tab>
        <Tab>Details</Tab>
        {props.suggestions && <Tab>Suggestions</Tab>}
      </TabList>

      <TabPanel className={styles.TabPanel}>
        <div className={styles.Content}>
          <div className={styles.Info}>
            <h1 className={styles.title}>{props.movie.title_long}</h1>
            <div className={styles.genres}>
              {
                props.movie.genres.map(genre => <span key={genre.uuid}>{genre.name}</span>)
              }
            </div>
            <p className={styles.description}>
              {props.movie.description_full}
            </p>
            <div className={styles.rating}>
              <img src={ImdbLogo} alt="IMDb Rating" />
              <span>{props.movie.rating}</span>
              <span className={styles.icon}>
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
            {
              (props.movie.mpa_rating) &&
              <p className={styles.mpaRating}>
                <FontAwesomeIcon icon={faEye} />
                <span style={{ marginLeft: '10px' }}>{props.movie.mpa_rating}</span>
              </p>
            }
            <div
              className={styles.PlayButtons}
              style={{ marginTop: '20px' }}
            >
              {
                props.movie.torrents.map(torrent => (
                  <Link to={`/player/${torrent.hash}`} key={torrent.hash}>
                    <div className={styles.PlayButton}>
                      <span>Play {torrent.quality}</span>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>

          <aside className={styles.Sidebar}>
            <img
              src={props.movie.large_cover_image}
              alt={props.movie.title_long}
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
                title={props.movie.title_long}
                style={{
                  width: '100%',
                  height: '60vh'
                }}
                src={`https://www.youtube.com/embed/${props.movie.yt_trailer_code}`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>

            <aside className={styles.Sidebar}>
              <div>
                <h2 className={styles.DetailsTitle}>Cast</h2>
                <div className={styles.Cast}>
                  <ul>
                    {
                      props.movie.cast.map(actor => (
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
                            {
                              actor.character_name &&
                              <span> as <b>{actor.character_name}</b></span>
                            }
                          </p>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>

              <div>
                <h2 className={styles.DetailsTitle}>Info</h2>
                <div className={styles.TorrentInfo}>
                  <ul>
                    {
                      props.movie.torrents.map(torrent => (
                        <li key={torrent.hash}>
                          <p className={styles.Quality}>{torrent.quality}</p>
                          <p>{torrent.size}</p>
                          <p className={styles.DateAdded}>
                            {moment(torrent.date_uploaded).format('MMM Do YYYY, h:mm:ss a')}
                          </p>
                        </li>
                      ))
                    }
                  </ul>
                </div>

                {
                  (props.movie.date_uploaded) &&
                  <p className={styles.dateAdded}>
                    <span>Date uploaded</span><br />
                    {moment(props.movie.date_uploaded).format('MMMM Do YYYY, h:mm:ss a')}
                  </p>
                }
              </div>
            </aside>
          </div>
        </div>
      </TabPanel>

      {
        props.suggestions &&
        <TabPanel className={styles.TabPanel}>
          <div className={styles.Content} style={{ flexDirection: 'column' }}>
            <MovieList
              movies={props.suggestions}
              perLine={4}
            />
          </div>
        </TabPanel>
      }

    </Tabs>

  </div>
);

export default MovieDetails;
