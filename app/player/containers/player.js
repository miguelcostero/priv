// @flow
import React, { Component } from 'react';
import WebTorrent from 'webtorrent';
import path from 'path';
import OpenSubtitles from 'opensubtitles-api';
import changeSubtitle from '../../utils/changeSubtitle';
import Video from '../components/video';
import Controls from '../components/controls';
import api from '../../config/api';
import { downloadPath } from '../../config/cache';
import PlayerLayout from '../components/player-layout';
import PlayPause from '../components/play-pause';
import FullScreen from '../components/full-screen';
import ProgressBar from '../components/progress-bar';
import Volume from '../components/volume';
import Timer from '../components/timer';
import Subtitles from '../components/subtitles';
import GoBack from '../components/go-back';
import Title from '../components/title';
import ControlButtonsLayout from '../components/buttons-layout';
import Left from '../components/buttons-left-layout';
import Right from '../components/buttons-right-layout';
import PlayerInfoLayout from '../components/player-info-layout';

type Props = {
  match: {
    params: {
      hash: string
    }
  },
  movie: {
    id: number,
    title: string,
    subtitles: {}
  },
  actions: {
    updateCurrentMovieSubtitles: (movie) => void
  }
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
    const torrentUrl = `${api.torrent}/${this.props.match.params.hash}`;
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
        imdbid: this.state.video.imdb_code,
        gzip: true
      }).then(subtitles => {
        console.log(subtitles, 'SUBTITLES');
        const movie = Object.assign(this.props.movie, {
          subtitles
        });
        this.props.actions.updateCurrentMovieSubtitles(movie);
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
    const selectedSubtitle = this.props.movie.subtitles[event.target.value];

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
    return (
      <PlayerLayout
        handleDoubleClick={this.handleFullScreenClick}
        setRef={this.setRefPlayer}
      >
        <PlayerInfoLayout
          opacity={(this.state.showInfo || this.state.pause) ? 1 : 0}
        >
          <GoBack path={`/movie/${this.props.movie.id}`} />
          <Title title={this.props.movie.title} />
          <Controls>
            <ControlButtonsLayout>
              <ProgressBar
                currentTime={this.state.video.currentTime}
                videoDuration={this.state.video.duration}
                downloaded={this.state.data.progress * 100}
                handleProgressChange={this.handleProgressChange}
                setRef={this.getProgressBarRef}
              />
              <Left>
                <PlayPause
                  pause={this.state.pause}
                  handleClick={this.togglePlay}
                />
                <Volume
                  handleVolumeChange={this.handleVolumeChange}
                  status={this.state.volumeStatus}
                  toggleMute={this.toggleMute}
                  setRef={this.getRefVolumeRange}
                />
                <Timer
                  duration={this.state.video.duration}
                  currentTime={this.state.video.currentTime}
                />
              </Left>
              <Right>
                <Subtitles
                  subtitles={this.props.movie.subtitles || {}}
                  handleChange={this.handleSubtitleChange}
                  currentSubtitle={this.state.currentSubtitle}
                />
                <FullScreen
                  handleClick={this.handleFullScreenClick}
                />
              </Right>
            </ControlButtonsLayout>
          </Controls>
        </PlayerInfoLayout>
        <Video
          setRef={this.setRef}
          autoplay
          controls={false}
          handleMouseMove={this.handleMouseMove}
          handleMouseLeave={this.handleMouseLeave}
          handleTimeUpdate={this.handleTimeUpdate}
          handleClick={this.togglePlay}
          handleKeyUp={this.handleKeyUpToTogglePlay}
          subtitle={this.state.currentSubtitle}
        />
      </PlayerLayout>
    );
  }
}
