const fs = require('fs');
const parser = require('dicom-parser');

function parse(fileName) {
  data = fs.readFileSync(fileName);
  //const byteArray = new Uint8Array(data);
  const dataset = parser.parseDicom(data);
  var options = {
    omitPrivateAttibutes: false,
    maxElementLength: 128
  };
  var instance = parser.explicitDataSetToJS(dataset, options);
  console.log(instance);

}

module.exports.parse = parse;