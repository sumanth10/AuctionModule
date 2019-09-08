/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import './app.css';
import { Row, Col } from 'react-materialize';
import Transactioncards from './Components/Cards';
import 'materialize-css/dist/css/materialize.min.css';

export default class App extends Component {
  componentDidMount() {
    // fetch('/api/getUsername')
    //   .then(res => res.json())
    //   .then(user => this.setState({ username: user.username }));

  }

  render() {
    return (
      <Row>
        <Col s={12}>
          <Transactioncards />
        </Col>
      </Row>
    );
  }
}
