// const prisma = require('../../../../db/dbInit');
// const deleteCategoryController = require('../deleteCategoryController');
// const createError = require('http-errors');
//
// jest.mock('prisma');
//
// describe('deleteCategoryController', () => {
//   const req = {
//     params: {
//       id: '123',
//     }
//   };
//
//   const res = {
//     json: jest.fn(() => true),
//   }
//
//   it('should delete the category and update all the spendinds with this category', async () => {
//     expect.assertions(2);
//     const { id: ID } = req.params;
//     prisma.categories = {
//       delete: jest.fn(_o => true),
//     };
//     prisma.spendings = {
//       updateMany: jest.fn(_o => true),
//     };
//     await deleteCategoryController(req, res, () => {});
//     expect(prisma.categories.delete).toHaveBeenCalledWith({
//       where: { ID },
//     });
//     expect(prisma.spendings.updateMany).toHaveBeenCalledWith({
//       where: { categoryID: ID },
//       data: { categoryID: null },
//     });
//   });
//
//   it('should return an error', async () => {
//     expect.hasAssertions();
//
//     const deleteErrorMessage = 'error deleting message';
//     prisma.categories = {
//       delete: () => {throw createError(500, deleteErrorMessage)},
//       updateMany: () => {},
//     };
//
//     try {
//       await deleteCategoryController(req, res, () => {});
//     } catch (err) {
//       expect(err.message).toEqual(deleteErrorMessage);
//     }
//   });
// });
