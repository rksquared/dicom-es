import * as express from 'express';
import * as dcm from './dicom';
import * as es from './es';

const app = express();

const port = 5005;

app.get('/', (req, res) => {
  console.log('inbound request @ GET "/" enpoint');
  dcm.parse(__dirname + '../assets/dicom_291.dcm');
  es.ping();
  res.send('recieving requests at "/"');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})