const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../../config/param-validation');
const auctionCtrl = require('./auction.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/items - Get list of users */
  .get(auctionCtrl.listitem)

  /** POST /api/items - Create new user */
  .post(validate(paramValidation.createItem), auctionCtrl.createItem);

router.route('/:itemId')
  /** GET /api/items/:itemId - Get user */
  .get(auctionCtrl.getItem)

  /** PUT /api/items/:itemId - Update user */
  .put(auctionCtrl.updateItem)

  /** DELETE /api/itemId/:itemId - Delete user */
  .delete(auctionCtrl.remove);

/** Update the auction details in the items document */
router.route('/:itemId/auction')

  .get(auctionCtrl.getAuctionDeatils)
  
  .put(validate(paramValidation.createAuction), auctionCtrl.addAuction)

/** Load user when API with itemId route parameter is hit */
router.param('itemId', auctionCtrl.loadItem);


module.exports = router;