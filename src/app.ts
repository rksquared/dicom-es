import * as express from 'express';
import * as dcm from './dicom';
import * as es from './es';

const app = express();

const port = 5005;


//use standard CORS headers
app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With`);
  // res.header(`Content-Type`, `Accept`);
  next();
});

app.get('/', (req, res) => {
  console.log('inbound request @ GET "/" enpoint');
  //make sure to check that the asset exists in your local copy of this repo!
  dcm.parse(__dirname + '/../assets/000001.dcm');
  es.ping();
  res.send('recieving requests at "/"');
});

app.get('/search', (req, res) => {
  console.log(`recieving inbound search request, searching for: ${req.query.q}`)

  es.search(req.query.q).then((rc) => {
    console.log('results in search then', rc);
    res.send(JSON.stringify(rc));
  }).catch((err) => {
    res.send(err); 
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})