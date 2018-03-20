// @flow
import request from 'request';
import zlib from 'zlib';
import path from 'path';
import fs from 'fs';
import * as Subtitle from 'subtitle';
import { downloadPath } from '../config/cache';

type Video = {
  name: string,
  path: string
}

type SelectedSubtitle = {
  downloads: string,
  encoding: string,
  filename: string,
  id: string,
  lang: string,
  langcode: string,
  score: number,
  url: string
}

export default async function ChangeSubtitle(selectedSubtitle: SelectedSubtitle, video: Video) {
  const zip = await getSubLib(selectedSubtitle.url);
  const buffer = await getSubBuffer(zip);

  const videoFolder = path.resolve(downloadPath, video.path.replace(video.name, ''));
  const filename = `${selectedSubtitle.langcode}.vtt`;

  await createSubFile(buffer, videoFolder, filename);

  return {
    src: path.resolve(videoFolder, filename),
    srcLang: selectedSubtitle.langcode,
    lang: selectedSubtitle.lang
  };
}

function getSubLib(url) {
  return new Promise((resolve, reject) => {
    request({
      url,
      encoding: null
    }, (err, response, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function getSubBuffer(zip) {
  return new Promise((resolve, reject) => {
    zlib.unzip(zip, (err, buffer) => {
      if (err) reject(err);
      else resolve(buffer);
    });
  });
}

function createSubFile(buffer, subPath: string, filename: string) {
  return new Promise((resolve, reject) => {
    const substitle = Subtitle.parse(buffer.toString());
    const vttString = Subtitle.stringifyVtt(substitle);

    fs.writeFile(path.resolve(subPath, filename), vttString, err => {
      if (err) {
        console.log(err, 'ERROR ON CREATE SUB');
        reject(new Error(`could not create ${filename}`));
      } else resolve(true);
    });
  });
}
