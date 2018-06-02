var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('apoloserver:server');
var http = require('http');

var app = express();
var port = process.env.PORT || 4000;
app.set('port', port);
var server = http.createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(require('./routes/index'));
app.use(require('./routes/users'));

server.listen(port, () => console.log('server listning on', port));
