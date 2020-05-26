const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utility/APIError');

const AuctionsSchema =  new mongoose.Schema({
    bidderId : {
        type: String,
        required: true
    },
    biddingPrice : {
        type: Number,
        required: true
    }
})
/**
 * Items Schema
 */
const ItemsSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  itemCategory: {
    type: String,
    required: true
  },
  itemBasePrice: {
    type: Number,
    required: true
  },
  servicePrice: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  vendorId: {
    type: String,
    required: true
  },
  auctions: [AuctionsSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  soldTo: {
    type: String,
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
ItemsSchema.method({
});

/**
 * Statics
 */
ItemsSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((item) => {
        if (item) {
          return item;
        }
        const err = new APIError('No such item exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('Items', ItemsSchema);