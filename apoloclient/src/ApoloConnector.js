import React, {Component} from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import App from './App.js';

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});


export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
