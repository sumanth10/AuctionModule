const Joi = require('joi');

module.exports = {
  // POST /api/users
  createBidder: {
    body: {
      biddername: Joi.string().required(),
      bidderId: Joi.string().required(),
      bidderIdNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  createVendor: {
    body: {
      username: Joi.string().required(),
      vendorId: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  createItem: {
    body: {
      itemname: Joi.string().required(),
      vendorID: Joi.string().required(),
      itemBasePrice: Joi.number().required(),
      category: Joi.string().required(),
    }
  },

  createAuction: {
    body: {
      bidderId: Joi.string().required(),
      biddingPrice: Joi.number().required(),
    }
  },

};
