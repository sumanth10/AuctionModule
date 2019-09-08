/* eslint-disable eqeqeq */
/* eslint-disable keyword-spacing */
/* eslint-disable func-names */

const db = require('./dbdata.js');


const updatetransaction = function (req, res) {
  if (req.body && Object.prototype.hasOwnProperty.call(req.body, 'id') && Object.prototype.hasOwnProperty.call(req.body, 'status')) {
    db.update(req.body.id, 'status', req.body.status)
      .then(() => db.update(req.body.id, 'processed', 'true'))
      .then((updateStatus) => {
        res.status(200).send(updateStatus);
      })
      .catch((err) => {
        res.status(400).send({ message: `Error updating the data ${err}` });
      });
  }else{
    res.status(400).send({ message: 'Bad request' });
  }
};

const getAllTransactions = function (req, res) {
  db.getAll()
    .then((transaction) => {
      if (transaction.length == 0) {
        res.status(200).send({});
      } else{
        res.status(200).send(transaction);
      }
    })
    .catch((err) => {
      res.status(400).send({ message: `Error fetching data${err}` });
    });
};

const getUnprocessedTransaction = function (req, res) {
  db.getUnprocessedTransactions()
    .then((transaction) => {
      if (transaction.length == 0) {
        res.status(200).send({});
      } else{
        res.status(200).send(transaction);
      }
    })
    .catch((err) => {
      res.status(400).send({ message: `Error fetching data${err}` });
    });
};


exports.updatetransaction = updatetransaction;
exports.getAllTransactions = getAllTransactions;
exports.getUnprocessedTransaction = getUnprocessedTransaction;
