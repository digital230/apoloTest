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
import {MongoClient} from 'mongodb';

import cors from 'cors';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './schema';
import resolvers from './resolver';


const app = express();
const port = process.env.PORT || 4000;
app.set('port', port);
const server = http.createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

MongoClient.connect(process.env.MONGO_URL)
  .then((database) => {
    const db = database.db('apolo');
    console.log('db connected');
    // db.collection('users').insert({name: 'omer'}, function(err, res) {
    //   if(err) console.log(err);
    //   console.log(res)
    // })
    db.collection('users').find({}).toArray().then((u) => {
      console.log(u)
    })
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers: resolvers(db)
    });

    app.use('/graphql',bodyParser.json(), graphqlExpress((req) => {
      console.log(req.body)
      let obj = {
        schema,
        tracing: true,
      };
      return obj;
    }));

    app.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql'
    }));
  })
  .catch(err => console.log(err, 'error database'))

// app.use(require('./routes/index'));
// app.use(require('./routes/users'));

server.listen(port, () => console.log('server listning on', port));
