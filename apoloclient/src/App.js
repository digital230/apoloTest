import React, { Component } from 'react';
import logo from './logo.svg';
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import './App.css';


const Query = gql`
  query rates($currency: String!) {
    rates(currency: $currency) {
      currency
      rate
    }
  }
`;

const Insert = gql `
  mutation insert($name: String!) {
    insert(name: $name) {
      success
      msg
    }
  }
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {

  }

  async submit() {
    const {name} = this.state;
    const res = await this.props.client.mutate({
      mutation: Insert,
      variables: {name}
    });
    console.log(res)
  }

  render() {
    const {rates = []} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="text" onChange={(e) => this.setState({name: e.target.value})} />
        <button onClick={() => this.submit()}>Insert</button>
      </div>
    );
  }
}

export default withApollo(App);
