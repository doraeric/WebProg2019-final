#!/usr/bin/env node
const config = (() => { try {return require('../config');} catch(e) {return require('../config.example');}})();
const express = require('express')
const app = express();
const net = require('net');
var db = {}

const search = (keyword, res) => {
  let buffer = '';
  var client = new net.Socket();
  client.connect(config.search_server.port, '127.0.0.1', function() {
    console.log('Connected');
    client.write(keyword);
  });

  client.on('error', function(e) {
    console.error(e);
    res.json({'error': "can't reach search server now"});
    client.destroy();
  });

  client.on('data', function(data) {
    console.log('Received data');
    buffer += data.toString('utf8')
    // client.destroy(); controlled by server
  });

  client.on('close', function() {
    console.log('Connection closed');
    if (!buffer) return;
    try {
      buffer = JSON.parse(buffer);
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
  let msg = '';
  if (user in db) {
    msg += `${user} is in db`;
  } else {
    msg += `${user} is not in db`;
    db[user] = []
  }
  console.log(msg)
  res.json(db[user])
});
app.get('/:user/search', function (req, res) {
  const user = req.params.user;
  const keyword = req.query.keyword;
  if (keyword === undefined) {
    res.send('Please give keyword');
    return;
  }
  let msg = '';
  msg += `Hi, ${user}\n`;
  if (!(user in db)) {
    db[user] = [];
  }
  db[user] = db[user].filter(e => e != keyword);
  db[user].unshift(keyword);
  msg += keyword;
  docs = search(keyword, res);
});
app.listen(config.api_server.port, function() {
  console.log(`api server listening on port ${config.api_server.port}!`);
});
