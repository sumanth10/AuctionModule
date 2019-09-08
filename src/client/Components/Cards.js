/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import '../app.css';
import {
  Row, Col, Icon, Collection, CollectionItem,
} from 'react-materialize';
import StatusButton from './StatusButtons';

const lodash = require('lodash');


export default class Transactioncards extends Component {
  // unprocessedtransactionArr = [];

  constructor(props) {
    super(props);
    this.state = {
      unprocessedtransactionArr: [],
      istransactionExists: true
    };
    this.getAllUprocessedTransaction = this.getAllUprocessedTransaction.bind(this);
  }

  componentDidMount() {
    this.getAllUprocessedTransaction();
  }

  getAllUprocessedTransaction() {
    this.setState({ unprocessedtransactionArr: [] });
    const unprocessedtransactionArr = lodash.cloneDeep(this.state.unprocessedtransactionArr);
    fetch('/api/getunprocessedtranscation')
      .then(res => res.json())
      .then(
        (data) => {
          if (!data.length) {
            this.setState({ istransactionExists: false });
          } else {
            data.map((tran) => {
              const tmpData = {
                transactionid: tran.transactionid,
                fromusr: tran.fromusr,
                tousr: tran.tousr,
                amount: tran.amt
              };
              unprocessedtransactionArr.push(tmpData);
            });


            this.setState({ unprocessedtransactionArr });
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log('Fetch Error :-S', error);
        }
      );
  }


  render() {
    return (
      <Row className="padding-top-13px" >
        <Col m={6} s={12} offset="m3">
          {this.state.istransactionExists ? (
            <Row>
              <Collection header="Transactions" className="z-depth-3">
                {this.state.unprocessedtransactionArr.map(trans => (

                  <CollectionItem className="z-depth-4">
                    <Row className="padding-top-13px">
                      <Col>
                    Transactions ID :
                        {' '}
                        {trans.transactionid}
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                    From User :
                        {' '}
                        {trans.fromusr}
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                    To User :
                        {' '}
                        {trans.tousr}
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                    Amount :
                        {' '}
                        {trans.amount}
                      </Col>
                    </Row>
                    <Row>
                      <Col m={3} offset="m6">
                        <StatusButton buttonName="active" getAllUprocessedTransaction={this.getAllUprocessedTransaction} transactionid={trans.transactionid} buttonColor="teal darken-4" />
                      </Col>
                      <Col m={3}>
                        <StatusButton buttonName="block" getAllUprocessedTransaction={this.getAllUprocessedTransaction} transactionid={trans.transactionid} buttonColor="red darken-4" />
                      </Col>
                    </Row>
                  </CollectionItem>

                ))}
              </Collection>
            </Row>
          )
            : (
              <Row>
                <Collection header="Transactions" className="z-depth-3" />
                <Icon large>queue</Icon>
                <blockquote>
                    No more transactions to evaluate
                </blockquote>
              </Row>
            ) }
        </Col>
      </Row>
    );
  }
}
