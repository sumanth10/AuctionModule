/* eslint-disable new-cap */
/* eslint-disable func-names */
const loki = require('lokijs');
const Q = require('q');

let db;
let transactions;

const initDB = function () {
  db = new loki('transaction.db');
  transactions = db.addCollection('transactions');
  transactions.insert({
    transactionid: 'ranD1', fromusr: 'usr1', tousr: 'usr2', amt: '100', processed: false,
  });
  transactions.insert({
    transactionid: 'ranD2', fromusr: 'usr2', tousr: 'usr1', amt: '200', processed: false,
  });
  transactions.insert({
    transactionid: 'ranD3', fromusr: 'usr3', tousr: 'usr2', amt: '300', processed: false,
  });
  transactions.insert({
    transactionid: 'ranD4', fromusr: 'usr4', tousr: 'usr3', amt: '400', processed: false,
  });
  transactions.insert({
    transactionid: 'ranD5', fromusr: 'usr5', tousr: 'usr5', amt: '500', processed: false,
  });
};

const find = function (transactionid, callback, errorcallback) {
  const founditem = transactions.findOne({ transactionid }, () => {
    callback(founditem);
  });
};

const update = function (transactionid, key, value) {
  const defer = Q.defer();
  const founditem = transactions.findOne({ transactionid });
  if (founditem == null || founditem.processed !== false) {
    defer.reject('Invalid Transaction');
  } else {
    founditem[key] = value;
    transactions.update(founditem);
    defer.resolve('Update successful');
  }
  return defer.promise;
};

const getAll = function () {
  const defer = Q.defer();
  const alltransactions = transactions.find();
  defer.resolve(alltransactions);
  return defer.promise;
};

const getUnprocessedTransactions = function () {
  const defer = Q.defer();
  const alltransactions = transactions.find({ processed: { $eq: false } });
  defer.resolve(alltransactions);
  return defer.promise;
};

exports.find = find;
exports.update = update;
exports.getAll = getAll;
exports.initDB = initDB;
exports.getUnprocessedTransactions = getUnprocessedTransactions;
