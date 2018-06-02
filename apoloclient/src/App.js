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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {
    const {client} = this.props;

    const res=  await client.query({
      query: Query,
      variables: {currency: 'USD'},
    });

    let {data: {rates}} = res;

    this.setState({rates});

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
        {rates.map((r, i) => {
          return <p key={i}>{`currency: ${r.currency}, rate: ${r.rate}`}</p>
        })}

      </div>
    );
  }
}

export default withApollo(App);
