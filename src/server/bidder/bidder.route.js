const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../../config/param-validation');
const bidderCtrl = require('./bidder.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/vendors - Get list of users */
  .get(bidderCtrl.listBidder)

  /** POST /api/vendors - Create new user */
  .post(validate(paramValidation.createBidder), bidderCtrl.createBidder);

router.route('/:bidderId')
  /** GET /api/vendors/:vendorId - Get user */
  .get(bidderCtrl.bidderId)

  /** DELETE /api/vendors/:vendorId - Delete user */
  .delete(bidderCtrl.remove);

/** Load user when API with vendor route parameter is hit */
router.param('vendorId', bidderCtrl.loadBidder);


module.exports = router;