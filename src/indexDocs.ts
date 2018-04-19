import * as fs from 'fs';
import * as path from 'path';
import * as dicom from './dicom';
import { CLIENT_RENEG_LIMIT } from 'tls';

const dir = process.argv[2];
console.log('Indexing: ', dir);


const traverseDir = (curIndexing) => {
  let curType = fs.statSync(curIndexing);

  if (curType.isFile()) {
    console.log('indexing dicom file:', curIndexing);
    return dicom.parse(curIndexing);
  }

  let files = fs.readdirSync(curIndexing);
  
  files.forEach((file) => {
    console.log('in the recurse conditional blog: ', file);
    traverseDir(curIndexing + '/' + file);
  })
};

traverseDir(dir);

