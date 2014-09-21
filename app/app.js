var express = require('express');
var app = express();

app.get('/foo', function(req, res){
  res.send('Hello World');
});

module.exports = app;