const express = require('express');
const app = express();

const port = process.env.PORT || 5005;


app.get('/', function(req, res) {
  console.log('inbound request @ GET "/" enpoint');

  res.send('recieving requests at "/"');
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})