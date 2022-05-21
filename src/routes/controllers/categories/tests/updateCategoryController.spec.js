const prisma = require('../../../../db/dbInit');
const updateCategoryController = require('../updateCategoryController');
const createError = require('http-errors');

jest.mock('prisma');

describe('updateCategoryController', () => {
  const req = {
    body: {
      ID: '123',
      name: 'alimentation',
      color: '#fff',
      userID: '1',
    }
  }

  const categories = [
    {
      ID: '123',
      name: 'alimentation',
      color: '#fff',
      userID: '1',
    },
    {
      ID: '444',
      name: 'foo',
      color: '#ccc',
      userID: '1',
    }
  ];

  const updatedObject = {
    where: { ID: '123' },
    data: {
      name: 'alimentation',
      color: '#fff',
    },
  }

  const res = {
    json: jest.fn(categories => categories),
    status: _code => ({ json: err => err }),
  };


  it('should update the category and return some categories', async () => {
    prisma.categories = {
      update: jest.fn(() => true),
      findMany: () => categories,
    }
    await updateCategoryController(req, res);

    expect(prisma.categories.update).toHaveBeenCalledWith(updatedObject);
    expect(res.json).toHaveBeenCalledWith(categories);
  });

  it('should return an error', async () => {
    // expect.assertions
    // see: https://stackoverflow.com/questions/50816254/necessary-to-use-expect-assertions-if-youre-awaiting-any-async-function-calls
    // see: https://stackoverflow.com/a/58103698/5671836
    expect.hasAssertions();

    const categoryErrorMessage = 'category update error';
    prisma.categories = {
      update: () => {throw createError(500, categoryErrorMessage)},
      findMany: () => categories,
    };

    try {
      await updateCategoryController(req, res, () => {});
    } catch (err) {
      expect(err.message).toEqual(categoryErrorMessage);
    }
  });
});

