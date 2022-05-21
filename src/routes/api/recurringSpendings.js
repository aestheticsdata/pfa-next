const router = require('express').Router();
const checkToken = require('./helpers/checkToken');
const catchAsync = require('../../utils/catchAsync');

const getRecurringsController = require('../controllers/recurrings/getRecurringsController');
const postRecurringController = require('../controllers/recurrings/postRecurringController');
const updateRecurringController = require('../controllers/recurrings/updateRecurringController');
const postCopyRecurrings = require('../controllers/recurrings/postCopyRecurrings');
const deleteRecurringController = require('../controllers/recurrings/deleteRecurringController');

router.get('/', checkToken, catchAsync(getRecurringsController));
router.post('/', checkToken, catchAsync(postRecurringController));
router.put('/:id', checkToken, catchAsync(updateRecurringController));
router.post('/copy', checkToken, catchAsync(postCopyRecurrings));
router.delete('/:id', checkToken, catchAsync(deleteRecurringController));

module.exports = router;
