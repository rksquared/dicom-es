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

app.get('/search', (req, res) => {
  es.search(req.query.q).then((rc) => {
    res.send(rc);
  }).catch((err) => {
    res.send('ERROR'); 
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})