#!/usr/bin/env node
const config = (() => { try {return require('../config');} catch(e) {return require('../config.example');}})();
const express = require('express')
const cors = require('cors')
const app = express();
const net = require('net');
var db = {}

app.use(cors(config.api_server.corsOptions));

const search = (keyword, res) => {
  let buffer = null;
  var client = new net.Socket();
  client.connect(config.search_server.port, '127.0.0.1', function() {
    console.log('Connected to search server');
    client.write(keyword);
  });

  client.on('error', function(e) {
    console.error(e);
    res.json({'error': "can't reach search server now"});
    client.destroy();
  });

  client.on('data', function(data) {
    console.log('Received data from search server');
    if (buffer == null) {
      buffer = Buffer.from(data);
    } else {
      buffer = Buffer.concat([buffer, data]);
    }
    // client.destroy(); controlled by server
  });

  client.on('close', function() {
    console.log('Connection to search server closed');
    if (!buffer) return;
    try {
      buffer = JSON.parse(buffer.toString('utf8'));
    } catch (e) {
      return console.error(e);
    }
    res.send(buffer);
  });
}

app.get('/', function(req, res) {
  res.send('hello world');
});
app.get('/:user/gethistory', function (req, res) {
  const user = req.params.user;
  if (!(user in db)) {
    db[user] = []
  }
  res.json(db[user])
});
app.get('/:user/search', function (req, res) {
  const user = req.params.user;
  const keyword = req.query.keyword;
  console.log(`[*] Acepted connection from: ${req.ip}, user: ${user}, keyword: ${keyword}`);
  if (keyword === undefined) {
    res.send('Please give keyword');
    return;
  }
  if (!(user in db)) {
    db[user] = [];
  }
  db[user] = db[user].filter(e => e != keyword);
  db[user].unshift(keyword);
  docs = search(keyword, res);
});

app.listen(config.api_server.port, function() {
  console.log(`api server listening on port ${config.api_server.port}!`);
});
