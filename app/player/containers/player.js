// @flow
import path from 'path';
import React, { Component } from 'react';
import uuid from 'uuid/v4';
import WebTorrent from 'webtorrent';
import yifysubtitles from 'yifysubtitles';
import { torrent } from '../../config/api';
import { getDownloadPath } from '../../config/cache';
import ControlButtonsLayout from '../components/buttons-layout';
import Left from '../components/buttons-left-layout';
import Right from '../components/buttons-right-layout';
import Controls from '../components/controls';
import FullScreen from '../components/full-screen';
import GoBack from '../components/go-back';
import PlayPause from '../components/play-pause';
import PlayerInfoLayout from '../components/player-info-layout';
import PlayerLayout from '../components/player-layout';
import ProgressBar from '../components/progress-bar';
import Subtitles from '../components/subtitles';
import Timer from '../components/timer';
import Title from '../components/title';
import Video from '../components/video';
import Volume from '../components/volume';

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
    updateCurrentMovie: movie => void,
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
      currentTime: 0
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
  };

  componentDidMount() {
    const { actions, match } = this.props;
    actions.isLoading(true);
    this.togglePlay();
    getDownloadPath()
      .then(downloadPath => {
        const torrentUrl = `${torrent}/${match.params.hash}`;
        const options = {
          path: downloadPath
        };

        this.client.add(torrentUrl, options);

        this.client.on('torrent', t => {
          const video = t.files.find(file => file.name.endsWith('.mp4'));
          const videoPath = path.resolve(
            downloadPath,
            video.path.replace(video.name, '')
          );

          console.log(video, 'VIDEO');

          video.renderTo(
            this.video,
            {
              autoplay: false,
              controls: false
            },
            err => {
              if (err) console.log(err, 'ERROR ON RENDER');
              else {
                yifysubtitles(movie.imdb_code, {
                  path: videoPath,
                  langs: ['es', 'en', 'fr']
                })
                  .then(res => {
                    console.log(res, 'YIFY SUBTITLES');
                    actions.isLoading(false);
                    this.togglePlay();

                    // fomrat subtitles form
                    const subtitles = res.map(sub => ({
                      ...sub,
                      uuid: uuid()
                    }));

                    const movie = Object.assign(movie, {
                      subtitles
                    });

                    actions.updateCurrentMovie(movie);
                    return true;
                  })
                  .catch(error => {
                    console.error(error, 'ERROR GETTING SUBTITLES');
                    actions.isLoading(false);
                    this.togglePlay();
                  });
              }
            }
          );

          t.on('download', bytes => {
            this.setState({
              data: {
                currentBytes: bytes,
                downloaded: t.downloaded,
                downloadSpeed: t.downloadSpeed,
                progress: t.progress
              }
            });
          });
        });

        this.client.on('error', err => {
          console.error(err, 'ERROR ON WEBTORRENT CLIENT');
        });

        return true;
      })
      .catch(err => console.error(err, 'COULD NOT CREATE NEW FOLDER'));
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
  };

  setRefPlayer = element => {
    this.player = element;
  };

  handleMouseMove = () => {
    const { showInfo } = this.state;
    if (!showInfo) {
      this.setState({
        showInfo: true
      });

      this.timeOut = setTimeout(() => {
        this.setState({
          showInfo: false
        });
      }, 2500);
    }
  };

  handleFullScreenClick = () => {
    if (!document.webkitIsFullScreen) {
      this.player.webkitRequestFullscreen();
    } else {
      document.webkitExitFullscreen();
    }
  };

  handleKeyUpToTogglePlay = event => {
    event.preventDefault();
    if (event.keyCode === 32) {
      this.togglePlay();
    }
  };

  handleTimeUpdate = () => {
    this.setState({
      video: {
        currentTime: this.video.currentTime,
        duration: this.video.duration
      }
    });
  };

  togglePlay = () => {
    const { pause } = this.state;
    this.setState({
      pause: !pause
    });
  };

  handleVolumeChange = event => {
    const volume = event.target.value;
    this.video.volume = volume;
    this.changeVolumeIcon(volume);
  };

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
  };

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
  };

  getRefVolumeRange = element => {
    this.inputVolumeRange = element;
  };

  handleProgressChange = event => {
    const { video } = this.state;
    const clickPositionProgressBar = event.pageX - this.progressBar.offsetLeft;
    const progressBarWidth = this.progressBar.offsetWidth;
    const clickPosition = clickPositionProgressBar / progressBarWidth;
    const newCurrentTime = video.duration * clickPosition;
    this.video.currentTime = newCurrentTime;
  };

  getProgressBarRef = element => {
    this.progressBar = element;
  };

  handleSubtitleChange = event => {
    const {
      movie: { subtitles }
    } = this.props;
    const selectedSubtitle = subtitles.find(
      sub => sub.langShort === event.target.value
    );

    this.setState({
      currentSubtitle: Object.assign(
        {},
        {
          srcLang: selectedSubtitle.langShort,
          src: selectedSubtitle.path,
          lang: selectedSubtitle.lang.replace(/\b\w/g, l => l.toUpperCase())
        }
      )
    });
  };

  handleSeeking = () => {
    const { actions } = this.props;
    actions.isLoading(true);
  };

  handleSeeked = () => {
    const { actions } = this.props;
    actions.isLoading(false);
  };

  render() {
    const { movie } = this.props;
    const {
      showInfo,
      pause,
      video,
      volumeStatus,
      data,
      currentSubtitle
    } = this.state;
    return (
      <PlayerLayout
        handleDoubleClick={this.handleFullScreenClick}
        setRef={this.setRefPlayer}
      >
        <PlayerInfoLayout hide={showInfo || pause}>
          <GoBack path={`/movie/${movie.id}`} />
          <Title title={movie.title} />
          <Controls>
            <ControlButtonsLayout>
              <ProgressBar
                currentTime={video.currentTime}
                videoDuration={video.duration}
                downloaded={data.progress * 100}
                handleProgressChange={this.handleProgressChange}
                setRef={this.getProgressBarRef}
              />
              <Left>
                <PlayPause pause={pause} handleClick={this.togglePlay} />
                <Volume
                  handleVolumeChange={this.handleVolumeChange}
                  status={volumeStatus}
                  toggleMute={this.toggleMute}
                  setRef={this.getRefVolumeRange}
                />
                <Timer
                  duration={video.duration}
                  currentTime={video.currentTime}
                />
              </Left>
              <Right>
                <Subtitles
                  subtitles={movie.subtitles}
                  handleChange={this.handleSubtitleChange}
                  currentSubtitle={currentSubtitle}
                />
                <FullScreen handleClick={this.handleFullScreenClick} />
              </Right>
            </ControlButtonsLayout>
          </Controls>
        </PlayerInfoLayout>
        <Video
          pause={pause}
          getRef={this.getVideoRef}
          handleMouseMove={this.handleMouseMove}
          handleTimeUpdate={this.handleTimeUpdate}
          handleClick={this.togglePlay}
          handleKeyUp={this.handleKeyUpToTogglePlay}
          subtitle={currentSubtitle}
          handleSeeking={this.handleSeeking}
          handleSeeked={this.handleSeeked}
        />
      </PlayerLayout>
    );
  }
}
