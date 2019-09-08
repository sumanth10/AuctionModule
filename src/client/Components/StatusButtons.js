/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import '../app.css';
import { Row, Col, Button } from 'react-materialize';

export default class StatusButton extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  
  }

  changeTransactionStatus = () => {
    fetch('/api/updatetransaction', {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        status: this.props.buttonName,
        id: this.props.transactionid
      })
    })
      .then((data) => {
        console.log('Request succeeded with JSON response', data);
      })
      .then(() => {
        this.props.getAllUprocessedTransaction()
  })
      .catch((error) => {
        console.log('Request failed', error);
      });
  }

  render() {
    return (
      <Row>
        <Col m={3}>
          <Button className={this.props.buttonColor} style={{ marginRight: '1px'  }} onClick={this.changeTransactionStatus}>
            {this.props.buttonName}
          </Button>
        </Col>
      </Row>
    );
  }
}
