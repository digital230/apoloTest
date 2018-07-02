import { combineResolvers } from 'apollo-resolvers';
import user from './user';

export default (db) => combineResolvers([
  user(db),
]);

