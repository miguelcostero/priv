import path from 'path';
import fs from 'fs';
import { remote } from 'electron';
import settings from 'electron-settings';

const { app } = remote;

export default {
  getDownloadPath
};

function getDownloadPath() {
  return new Promise((resolve, reject) => {
    if (settings.has('cacheFolder')) {
      resolve(settings.get('cacheFolder'));
    } else {
      let downloadPath = app.getPath('videos');
      const test = path.resolve(downloadPath, 'priv');

      checkDirectory(test, (err) => {
        if (err) reject(new Error('ha ocurrido un error, oops.'));
        downloadPath = test;
        settings.set('cacheFolder', downloadPath);
        resolve(downloadPath);
      });
    }
  });
}

function checkDirectory(dir, callback) {
  fs.stat(dir, (err) => {
    if (err && err.errno === -2) {
      fs.mkdir(dir, callback);
    } else {
      callback(err);
    }
  });
}
