const router = require('express').Router();
const checkToken = require('./helpers/checkToken');
const catchAsync = require('../../utils/catchAsync');

const getMonthlyBudgetStatsController = require('../controllers/monthlyStats/getMonthlyBudgetStatsController');

router.get('/', checkToken, catchAsync(getMonthlyBudgetStatsController));

module.exports = router;
