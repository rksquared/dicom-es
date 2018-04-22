import * as express from 'express';
import * as stream from 'stream';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as path from 'path';
import * as dcm from './dicom';
import * as es from './es';
const zip = require('express-zip');

const app = express();

app.use(express.static(`${__dirname}/../client/build`));

const port = 5005 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//use standard CORS headers
app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

// app.get('/', (req, res) => {
//   console.log('inbound request @ GET "/" enpoint');
//   //make sure to check that the asset exists in your local copy of this repo!
//   dcm.parse(__dirname + '/../assets/000001.dcm');
//   es.ping();
//   res.send('recieving requests at "/"');
// });

app.get('/search', (req, res) => {
  console.log(`recieving inbound search request, searching for: ${req.query.q}`)

  es.search(req.query.q).then((rc) => {
    console.log('results in search then', rc);
    res.send(JSON.stringify(rc));
  }).catch((err) => {
    res.send(err); 
  });
});

app.get('/scan', (req, res) => {
  console.log('recieving inbound GET request for scan @ filepath: ', req.query.q);
  const scanData = dcm.parseImage(req.query.q);
  // res.write(scanData, 'binary');

  res.end(new Buffer(scanData), 'binary');
});

app.post('/files', (req, res) => {
  res.zip( req.body.filePaths.map((filePath) => {
    return { path: path.join(__dirname + '/../', filePath), name: path.basename(filePath) };
  }));
  // res.end(fs.readFileSync('/Users/rksquared/projects/hrnyc14/immersive/solo_wk/dicom-es/assets/iTerm2-Color-Schemes-master.zip'), 'binary');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})