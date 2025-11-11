const router = require('express').Router();
const checkToken = require('./helpers/checkToken');
const getCategoriesController = require('../controllers/categories/getCategoriesController');
const updateCategoryController = require('../controllers/categories/updateCategoryController');
const deleteCategoryController = require('../controllers/categories/deleteCategoryController');
const catchAsync = require('../../utils/catchAsync');


router.get('/', checkToken, catchAsync(getCategoriesController));
router.put('/:id', checkToken, catchAsync(updateCategoryController));
router.delete('/:id', checkToken, catchAsync(deleteCategoryController));

// router.post('/add', (req, res) => {
//   const {
//     name,
//     color,
//   } = req.body;
//
//   if(!name) {
//     return res.status(400).json({ msg: 'Please enter a name' });
//   }
//
//   const newCategory = new Category({
//     name,
//     color,
//   });

module.exports = router;
