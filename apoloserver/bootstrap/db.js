import {MongoClient} from 'mongodb';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../schema';
import resolvers from '../resolver';

export default () => {
  return MongoClient.connect(process.env.MONGO_URL)
  .then((database) => {
    const db = database.db('apolo')
    console.log('db connected');
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers: resolvers(db)
    });

    return {
      database: db,
      schema
    };
  })
  .catch(err => console.log(err, 'error database'))
}
