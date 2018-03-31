// @flow
import React, { Component } from 'react';
import settings from 'electron-settings';
import { getDownloadPath } from '../../config/cache';
import SettingsLayout from '../components/settings-layout';
import CacheFolderSelector from '../components/cache-folder-selector';
import Title from '../components/title';

type Props = {};

export default class Settings extends Component<Props> {
  props: Props;
  state = {
    path: ''
  }

  componentDidMount() {
    getDownloadPath().then(path => {
      this.setState({
        path
      });
      return true;
    }).catch(err => console.error(err));
  }

  openFolderSelector = () => {
    this.input.click();
  }

  changeCacheFolder = element => {
    const { path } = element.target.files[0];

    settings.set('cacheFolder', path);
    this.setState({
      path
    });
    console.log(settings.get('cacheFolder'), 'NEW CACHE FOLDER');
  }

  getInputFolderSelectorRef = element => {
    this.input = element;
  }

  render() {
    return (
      <SettingsLayout>
        <Title title="Priv Settings" />

        <CacheFolderSelector
          handleClick={this.openFolderSelector}
          handleChange={this.changeCacheFolder}
          setRef={this.getInputFolderSelectorRef}
          path={this.state.path}
        />
      </SettingsLayout>
    );
  }
}
