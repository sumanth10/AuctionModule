const Vendor = require('./vendor.model');

/**
 * Load user and append to req.
 */
function loadVendor(req, res, next, id) {
    Vendor.get(id)
    .then((vendor) => {
      req.vendor = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function vendorId(req, res) {
  return res.json(req.vendor);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {Vendor}
 */
function createVendor(req, res, next) {
  const vendor = new Vendor({
    username: req.body.username,
    mobileNumber: req.body.mobileNumber,
    vendorId: req.body.vendorId
  });

  vendor.save()
    .then(savedVendor => res.json(savedVendor))
    .catch(e => next(e));
}


/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function listvendor(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Vendor.list({ limit, skip })
    .then(vendor => res.json(vendor))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const vendor = req.vendor;
  vendor.remove()
    .then(deletedVendor => res.json(deletedVendor))
    .catch(e => next(e));
}

module.exports = { loadVendor, vendorId, createVendor, listvendor, remove };