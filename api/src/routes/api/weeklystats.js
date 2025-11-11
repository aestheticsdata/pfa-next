const router = require('express').Router();
const weeklystatsController = require('../controllers/weeklystats/weeklystatsController');
const catchAsync = require('../../utils/catchAsync');

router.get('/', catchAsync(weeklystatsController));

module.exports = router;

