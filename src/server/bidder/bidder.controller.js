const Bidder = require('./bidder.model');

/**
 * Load user and append to req.
 */
function loadBidder(req, res, next, id) {
    Bidder.get(id)
    .then((bidder) => {
      req.bidder = bidder; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function bidderId(req, res) {
  return res.json(req.bidder);
}

/**
 * Create new user
 * @property {string} req.body.biddername - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {Vendor}
 */
function createBidder(req, res, next) {
  const bidder = new Bidder({
    bidderName: req.body.biddername,
    bidderIdNumber: req.body.bidderIdNumber,
    bidderId : req.body.bidderId
  });

  bidder.save()
    .then(savedBidder => res.json(savedBidder))
    .catch(e => next(e));
}


/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function listBidder(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Bidder.list({ limit, skip })
    .then(bidder => res.json(bidder))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const bidder = req.bidder;
  bidder.remove()
    .then(deletedBidder => res.json(deletedBidder))
    .catch(e => next(e));
}

module.exports = { loadBidder, bidderId, createBidder, listBidder, remove };