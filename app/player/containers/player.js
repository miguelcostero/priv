// @flow
import React, { Component } from 'react';
import WebTorrent from 'webtorrent';
import path from 'path';
import uuid from 'uuid/v4';
import yifysubtitles from 'yifysubtitles';
import Video from '../components/video';
import Controls from '../components/controls';
import langs from '../../config/langs.json';
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
    imdb_code: string,
    subtitles: {}
  },
  actions: {
    updateCurrentMovie: (movie) => void,
    isLoading: (active: boolean) => void
  }
};

export default class Player extends Component<Props> {
  props: Props;
  state = {
    pause: false,
    volumeStatus: 'off',
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
    this.props.actions.isLoading(true);
    this.togglePlay();
    const torrentUrl = `${api.torrent}/${this.props.match.params.hash}`;
    const options = {
      path: downloadPath
    };

    this.client.add(torrentUrl, options);

    this.client.on('torrent', torrent => {
      const video = torrent.files.find(file => file.name.endsWith('.mp4'));
      const videoPath = path.resolve(downloadPath, video.path.replace(video.name, ''));

      console.log(video, 'VIDEO');

      video.renderTo(this.video, {
        autoplay: false,
        controls: false
      }, (err) => {
        if (err) console.log(err, 'ERROR ON RENDER');
        else {
          yifysubtitles(this.props.movie.imdb_code, {
            path: videoPath,
            langs: Object.keys(langs)
          }).then(res => {
            console.log(res, 'YIFY SUBTITLES');
            this.props.actions.isLoading(false);
            this.togglePlay();

            // fomrat subtitles form
            const subtitles = res.map(sub => ({
              ...sub,
              uuid: uuid()
            }));

            const movie = Object.assign(this.props.movie, {
              subtitles
            });

            this.props.actions.updateCurrentMovie(movie);
            return true;
          }).catch(error => console.error(error, 'YIFY'));
        }
      });

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
  timeOut = null;

  getVideoRef = element => {
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
    const { subtitles } = this.props.movie;
    const selectedSubtitle = subtitles.find(sub => sub.langShort === event.target.value);

    this.setState({
      currentSubtitle: Object.assign({}, {
        srcLang: selectedSubtitle.langShort,
        src: selectedSubtitle.path,
        lang: selectedSubtitle.lang.replace(/\b\w/g, l => l.toUpperCase())
      })
    });
  }

  handleSeeking = () => {
    this.props.actions.isLoading(true);
  }

  handleSeeked = () => {
    this.props.actions.isLoading(false);
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
                  subtitles={this.props.movie.subtitles}
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
          pause={this.state.pause}
          getRef={this.getVideoRef}
          handleMouseMove={this.handleMouseMove}
          handleTimeUpdate={this.handleTimeUpdate}
          handleClick={this.togglePlay}
          handleKeyUp={this.handleKeyUpToTogglePlay}
          subtitle={this.state.currentSubtitle}
          handleSeeking={this.handleSeeking}
          handleSeeked={this.handleSeeked}
        />
      </PlayerLayout>
    );
  }
}
