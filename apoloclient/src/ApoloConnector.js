import React, {Component} from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import App from './App.js';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});


export default () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
