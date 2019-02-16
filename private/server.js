const express = require('express');
const app = express();
const fs = require('fs');

const server = app.listen(8080, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });

  app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    let readSteam = fs.createReadStream(__dirname + '/../public/index.html', 'utf8');
    readSteam.pipe(res);
  });