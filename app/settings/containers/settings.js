// @flow
import settings from 'electron-settings';
import React, { Component } from 'react';
import { getDownloadPath } from '../../config/cache';
import CacheFolderSelector from '../components/cache-folder-selector';
import SettingsLayout from '../components/settings-layout';
import Title from '../components/title';

type Props = {};

export default class Settings extends Component<Props> {
  props: Props;

  state = {
    path: ''
  };

  componentDidMount() {
    getDownloadPath()
      .then(path => {
        this.setState({
          path
        });
        return true;
      })
      .catch(err => console.error(err));
  }

  openFolderSelector = () => {
    this.input.click();
  };

  changeCacheFolder = element => {
    const { path } = element.target.files[0];

    settings.set('cacheFolder', path);
    this.setState({
      path
    });
    console.log(settings.get('cacheFolder'), 'NEW CACHE FOLDER');
  };

  getInputFolderSelectorRef = element => {
    this.input = element;
  };

  render() {
    const { path } = this.state;
    return (
      <SettingsLayout>
        <Title title="Priv Settings" />

        <CacheFolderSelector
          handleClick={this.openFolderSelector}
          handleChange={this.changeCacheFolder}
          setRef={this.getInputFolderSelectorRef}
          path={path}
        />
      </SettingsLayout>
    );
  }
}
