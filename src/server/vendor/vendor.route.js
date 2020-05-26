const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../../config/param-validation');
const vendorCtrl = require('./vendor.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/vendors - Get list of users */
  .get(vendorCtrl.listvendor)

  /** POST /api/vendors - Create new user */
  .post(validate(paramValidation.createVendor), vendorCtrl.createVendor);

router.route('/:vendorId')
  /** GET /api/vendors/:vendorId - Get user */
  .get(vendorCtrl.vendorId)

  /** DELETE /api/vendors/:vendorId - Delete user */
  .delete(vendorCtrl.remove);

/** Load user when API with vendor route parameter is hit */
router.param('vendorId', vendorCtrl.loadVendor);


module.exports = router;