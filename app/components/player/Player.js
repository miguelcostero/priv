// @flow
import React, { Component } from 'react';
import WebTorrent from 'webtorrent';
import axios from 'axios';
import path from 'path';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/fontawesome-free-solid';
import OpenSubtitles from 'opensubtitles-api';
import changeSubtitle from '../../utils/changeSubtitle';
import Video from './video/Video';
import Controls from './video-controls/VideoControls';
import api from '../../config/api';
import { downloadPath } from '../../config/cache';
import styles from './Player.sass';

type Props = {
  movieId: string,
  movieHash: string
};

export default class Player extends Component<Props> {
  props: Props;
  state = {
    pause: false,
    volumeStatus: 'off',
    videoPath: null,
    videoName: null,
    video: {
      duration: 0,
      currentTime: 0,
    },
    movie: {},
    subtitles: {},
    currentSubtitle: {
      src: '',
      srcLang: '',
      lang: ''
    },
    showInfo: false,
    data: {
      currentBytes: 0,
      downloaded: 0,
      downloadSpeed: 0,
      progress: 0
    }
  }

  componentDidMount() {
    console.log(this.OpenSub, 'OpenSubtitles');

    const torrentUrl = `${api.torrent}/${this.props.movieHash}`;
    const options = {
      path: downloadPath
    };

    this.client.add(torrentUrl, options);

    this.client.on('torrent', torrent => {
      const video = torrent.files.find(file => file.name.endsWith('.mp4'));

      this.setState({
        videoName: video.name,
        videoPath: video.path
      });

      console.log(video, 'VIDEO');
      this.OpenSub.search({
        path: path.resolve(downloadPath, video.path),
        gzip: true
      }).then(subtitles => {
        console.log(subtitles, 'SUBTITLES');
        this.setState({
          subtitles
        });
        return true;
      }).catch(err => console.error(err, 'OPEN SUBTITLES ERROR SEARCH'));

      video.renderTo(this.video);

      torrent.on('download', bytes => {
        this.setState({
          data: {
            currentBytes: bytes,
            downloaded: torrent.downloaded,
            downloadSpeed: torrent.downloadSpeed,
            progress: torrent.progress
          }
        });
      });
    });

    this.client.on('error', err => {
      console.error(err, 'ERROR ON WEBTORRENT CLIENT');
    });

    axios.get(`${api.url}/movie_details.json`, {
      params: {
        movie_id: this.props.movieId
      }
    }).then(res => {
      this.setState({
        movie: res.data.data.movie
      });
      document.title = `${this.state.movie.title_long} - Priv`;
      return true;
    }).catch(err => console.error(err, 'ERROR'));
  }

  componentWillUnmount() {
    this.client.destroy();

    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
  }

  client = new WebTorrent();
  OpenSub = new OpenSubtitles({
    useragent: 'TemporaryUserAgent',
    ssl: true
  });
  timeOut = null;

  setRef = element => {
    this.video = element;
  }

  setRefPlayer = element => {
    this.player = element;
  }

  handleMouseMove = () => {
    if (!this.state.showInfo) {
      this.setState({
        showInfo: true
      });

      this.timeOut = setTimeout(() => {
        this.setState({
          showInfo: false
        });
      }, 2500);
    }
  }

  handleMouseLeave = () => {
    console.log('mouse leaved');
  }

  handleFullScreenClick = () => {
    if (!document.webkitIsFullScreen) {
      this.player.webkitRequestFullscreen();
    } else {
      document.webkitExitFullscreen();
    }
  }

  handleKeyUpToTogglePlay = event => {
    event.preventDefault();
    if (event.keyCode === 32) {
      this.togglePlay();
    }
  }

  handleTimeUpdate = () => {
    this.setState({
      video: {
        currentTime: this.video.currentTime,
        duration: this.video.duration
      }
    });
  }

  togglePlay = () => {
    if (this.state.pause) {
      this.video.play();
    } else {
      this.video.pause();
    }

    this.setState({
      pause: !this.state.pause
    });
  }

  handleVolumeChange = event => {
    const volume = event.target.value;
    this.video.volume = volume;
    this.changeVolumeIcon(volume);
  }

  toggleMute = () => {
    const currentVolume = this.video.volume;

    if (currentVolume > 0) {
      this.video.volume = 0;
      this.inputVolumeRange.value = 0;
      this.changeVolumeIcon(0);
    } else {
      this.video.volume = 1;
      this.inputVolumeRange.value = 1;
      this.changeVolumeIcon(1);
    }
  }

  changeVolumeIcon = volume => {
    if (volume >= 0.5) {
      this.setState({
        volumeStatus: 'up'
      });
    } else if (volume > 0 && volume < 0.5) {
      this.setState({
        volumeStatus: 'down'
      });
    } else if (volume <= 0) {
      this.setState({
        volumeStatus: 'mute'
      });
    }
  }

  getRefVolumeRange = element => {
    this.inputVolumeRange = element;
  }

  handleProgressChange = event => {
    const clickPositionProgressBar = event.pageX - this.progressBar.offsetLeft;
    const progressBarWidth = this.progressBar.offsetWidth;
    const clickPosition = clickPositionProgressBar / progressBarWidth;
    const newCurrentTime = this.state.video.duration * clickPosition;
    this.video.currentTime = newCurrentTime;
  }

  getProgressBarRef = element => {
    this.progressBar = element;
  }

  handleSubtitleChange = event => {
    console.log(event, 'SUBTITLE CHANGED');
    const selectedSubtitle = this.state.subtitles[event.target.value];

    changeSubtitle(selectedSubtitle, {
      name: this.state.videoName,
      path: this.state.videoPath
    }).then(result => {
      this.setState({
        currentSubtitle: result
      });
      return true;
    }).catch(err => console.error(err, 'BETA'));
  }

  render() {
    const { currentSubtitle } = this.state;

    return (
      <div
        className={styles.Container}
        onDoubleClick={this.handleFullScreenClick}
        ref={this.setRefPlayer}
      >
        <div
          className={styles.wrapper}
          style={
            (this.state.showInfo || this.state.pause) ?
              { opacity: 1 }
            :
              { opacity: 0 }
          }
        >
          <div
            className={styles.goBack}
          >
            <Link to={`/movie/${this.props.movieId}`}>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </Link>
          </div>
          <div
            className={styles.Details}
          >
            <p>{this.state.movie.title_long}</p>
          </div>

          <Controls
            downloaded={this.state.data.progress}
            className={styles.controls}
            pause={this.state.pause}
            togglePlay={this.togglePlay}
            handleFullScreenClick={this.handleFullScreenClick}
            currentTime={this.state.video.currentTime}
            videoDuration={this.state.video.duration}
            handleVolumeChange={this.handleVolumeChange}
            volumeStatus={this.state.volumeStatus}
            toggleMute={this.toggleMute}
            getRefVolumeRange={this.getRefVolumeRange}
            handleProgressChange={this.handleProgressChange}
            getProgressBarRef={this.getProgressBarRef}
            subtitles={this.state.subtitles}
            handleSubtitleChange={this.handleSubtitleChange}
            currentSubtitle={currentSubtitle}
          />
        </div>
        <div
          className={styles.PlayerWrapper}
          onClick={this.togglePlay}
          onKeyUp={this.handleKeyUpToTogglePlay}
          role="button"
          tabIndex="0"
        >
          <Video
            setRef={this.setRef}
            autoplay
            controls={false}
            handleMouseMove={this.handleMouseMove}
            handleMouseLeave={this.handleMouseLeave}
            handleTimeUpdate={this.handleTimeUpdate}
            subtitle={this.state.currentSubtitle}
          />
        </div>
      </div>
    );
  }
}
