const Items = require("./auction.model");
const CreateItemObj = require("./createItemObj");

/**
 * Load user and append to req.
 */
function loadItem(req, res, next, id) {
  Items.get(id)
    .then((item) => {
      req.item = item; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch((e) => next(e));
}

/**
 * Get user
 * @returns {Items}
 */
function getItem(req, res) {
  return res.json(req.item);
}

/**
 * Create new user
 * @property {string} req.body.itemname - The username of user.
 * @property {string} req.body.itembaseprice - The mobileNumber of user.
 * @returns {User}
 */
async function createItem(req, res, next) {
  try {
    const itemObj = new CreateItemObj(
      req.body.itemname,
      req.body.vendorID,
      req.body.category,
      req.body.itemBasePrice
    );
    const verify = await itemObj.verify();
    if (verify !== true) return next({ message: verify, isPublic: true });
    itemObj.calServiceCharge();
    itemObj.AddServiceCharge();
    const item = new Items(itemObj.createObject());

    item
      .save()
      .then((savedItem) => res.json(savedItem))
      .catch((e) => next(e));
  } catch (error) {
    next(error);
  }
}

/**
 * Update existing user
 * @returns {User}
 */
async function updateItem(req, res, next) {
  await Items.get(id)
    .then((item) => {
      for (let [keytemp, valuetemp] of Object.entries(req.body)) {
        item[keytemp] = valuetemp;
      }
    })
    .catch((e) => next(e));

  const itemObj = new CreateItemObj(
    item.itemname,
    item.vendorID,
    item.itemBasePrice
  );
  const verify = await itemObj.verify();
  if (verify !== true) next(verify);
  const item = await new Items(itemObj.createObject());
  item
    .save()
    .then((savedItem) => res.json(savedItem))
    .catch((e) => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function listitem(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Items.list({ limit, skip })
    .then((users) => res.json(users))
    .catch((e) => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const item = req.item;
  item
    .remove()
    .then((deletedItem) => res.json(deletedItem))
    .catch((e) => next(e));
}

/**
 * Create new user
 * @property {string} req.body.itemname - The username of user.
 * @property {string} req.body.itembaseprice - The mobileNumber of user.
 * @returns {User}
 */
function addAuction(req, res, next) {
  const auctionObj = {
    bidderId: req.body.bidderId,
    biddingPrice: req.body.biddingPrice,
  };

  req.item.auctions.push(auctionObj);
  const item = new Items(req.item);
  item
    .save()
    .then((savedItem) => res.json(savedItem))
    .catch((e) => next(e));
}

function getAuctionDeatils(req, res, next) {
  res.json(req.item.auctions);
}

module.exports = {
  loadItem,
  getItem,
  createItem,
  updateItem,
  listitem,
  remove,
  addAuction,
  getAuctionDeatils,
};
