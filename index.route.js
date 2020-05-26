const express = require('express');
const auctionRoutes = require('./src/server/auction/auction.route');
const bidderRoutes = require('./src/server/bidder/bidder.route');
const vendorsRoutes = require('./src/server/vendor/vendor.route');




const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/items', auctionRoutes);
router.use('/bidders', bidderRoutes);
router.use('/vendors', vendorsRoutes);


// mount auth routes at /auth
//router.use('/auth', authRoutes);

module.exports = router;
