require('dotenv').config();
require("babel-core/register");
require("babel-polyfill");

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('apoloserver:server');
var http = require('http');
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import db from './bootstrap/db.js';

var app = express();
var port = process.env.PORT || 4000;
app.set('port', port);
var server = http.createServer(app);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // if (req.method === "OPTIONS") res.send({ response: 'I am alive' }).status(200);
  next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

db().then((database, schema) => {
  try {
    app.use('/graphql', graphqlExpress((req) => {
      console.log(req.body)
      return {
        schema, context: {decoded: req.decoded}
      }
    }));
    app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }));
  } catch (e) {
    console.lo(e)
  }
})
.catch(err => console.log(err))

app.use(require('./routes/index'));
app.use(require('./routes/users'));

server.listen(port, () => console.log('server listning on', port));
