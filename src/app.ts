import * as express from 'express';
import * as dcm from './dicom';
const app = express();

const port = 5005;

app.get('/', (req, res) => {
  console.log('inbound request @ GET "/" enpoint');
  dcm.parse('./data/1.dcm');
  res.send('recieving requests at "/"');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})