const express = require('express');
const dcm = require('./dicom')
const app = express();

const port = process.env.PORT || 5005;


app.get('/', function(req, res) {
  console.log('inbound request @ GET "/" enpoint');
  dcm.parse(__dirname +'../assets/dicom_291.dcm');
  res.send('recieving requests at "/"');
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})

