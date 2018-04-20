import * as fs from 'fs';
import * as parser from 'dicom-parser';
import * as es from './es';

export function parse(fileName: string) {
  console.log('parsing fileName:', fileName);
  const data = fs.readFileSync(fileName);
  //const byteArray = new Uint8Array(data);
  try {
    const dataset = parser.parseDicom(data);
    const sopInstanceUID = dataset.string('x0020000d');
    const meta = {
      sopInstanceUID: dataset.string('x0020000d'),
      patientId:  dataset.string('x00100020'),
      studyDate:  dataset.string('x00080020'),
      modality: dataset.string('x00080060'),
      manufacturer: dataset.string('x00080070'),
      institutionName: dataset.string('x00080080'),
      institutionAddress: dataset.string('x00080081'),
      studyDescription: dataset.string('x00081030'),
      seriesDescription: dataset.string('x0008103e'),
      manufacturerModelName: dataset.string('x00081090'),
      patientName: dataset.string('x00100010'),
      patientBirthDate: dataset.string('x00100030'),
      patientSex: dataset.string('x00100040'),
      filePath: fileName
    }
    console.log(meta);
    es.saveDoc(meta);
  } catch (err) {
    return;
  }
  
}

export function parseImage(fileName: string) {
  console.log('parsing filename:', fileName, ' for binary imagedata');

  const data = fs.readFileSync(fileName);

  return data;

  // try {
  //   const dataset = parser.parseDicom(data);
  //   const pixelDataEl = dataset.elements.x7fe00010;

  //   const pixelDataBuffer = parser.sharedCopy(data, pixelDataEl.dataOffset, pixelDataEl.length);

  //   console.log('parsed binary imageData for ', fileName, ' binary element is:', pixelDataBuffer);

  //   // if(pixelDataEl.encapsulatedPixelData) {
  //   //   var imageFrame = parser.readEncapsulatedPixelData(dataset, pixelDataEl, 0);
  //   //   console.log('Old Image Frame length = ', imageFrame.length);
  
  //   //   if(pixelDataEl.basicOffsetTable.length) {
  //   //     var imageFrame = parser.readEncapsulatedImageFrame(dataset, pixelDataEl, 0);
  //   //     console.log('Image Frame length = ', imageFrame.length);
  //   //   } else {
  //   //     var imageFrame = parser.readEncapsulatedPixelDataFromFragments(dataset, pixelDataEl, 0, pixelDataEl.fragments.length);
  //   //     console.log('Image Frame length = ', imageFrame.length);
  //   //   }
  //   // }
  

  //   return pixelDataBuffer;
  // } catch (err) {
  //   return 'err';
  // }
}
