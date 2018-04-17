import * as fs from 'fs';
import * as parser from 'dicom-parser';
import * as es from './es';

export function parse(fileName: string) {
  const data = fs.readFileSync(fileName);
  //const byteArray = new Uint8Array(data);
  const dataset = parser.parseDicom(data);
  var options = {
    omitPrivateAttibutes: false,
    maxElementLength: 128
  };
  var instance = parser.explicitDataSetToJS(dataset, options);
  const sopInstanceUID = dataset.string('x0020000d');
  const meta = {
    sopInstanceUID: dataset.string('x0020000d'),
    patientId:  dataset.string('x00100020'),
    studyDate:  dataset.string('x00080020'),
    filePath: fileName
  }
  console.log(meta);
  es.saveDoc(meta);
}
