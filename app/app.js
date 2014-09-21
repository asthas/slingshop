var express = require('express');
var app = express();

app.get('/foo', function(req, res){
  res.send('Hello World');
});

app.get('/bar', function(req, res){
  res.send('Learning ExpressJS');
});

module.exports = app;