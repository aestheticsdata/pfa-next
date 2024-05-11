const router = require('express').Router();
const checkToken = require('./helpers/checkToken');
const statisticsController = require('../controllers/statistics/statisticsController');
const catchAsync = require('../../utils/catchAsync');

router.get('/', checkToken, catchAsync(statisticsController));

module.exports = router;
