import * as fs from 'fs';
import * as dicom from './dicom';

const dir = process.argv[2];
console.log('Indexing: ', dir);

const files = fs.readdirSync(dir)
files.forEach((file) => {
  dicom.parse(dir + '/' + file);
})