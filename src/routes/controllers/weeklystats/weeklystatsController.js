const prisma = require('../../../db/dbInit');

const endOfMonth = require('date-fns').endOfMonth;
const getDay = require('date-fns').getDay;
const format = require('date-fns').format;
const getDaysInMonth = require('date-fns').getDaysInMonth;
const getYear = require('date-fns').getYear;
const getMonth = require('date-fns').getMonth;


const weeklystatsController = async (req, res, _next) => {
  const {
    start,
    userID,
  } = req.query;

  const startDate = new Date(start);

  const makeRange = (monthSpending) => {
    const ranges = [];
    const dayNumberFromMonthStart = getDay(startDate); // Sunday is 0
    const firstSlice = 7 - dayNumberFromMonthStart;
    const numberOfDaysInMonth = getDaysInMonth(startDate);
    ranges.push(firstSlice);
    const numberOfFullWeeks = Math.floor((numberOfDaysInMonth - firstSlice) / 7);
    for (let i = 0, l = numberOfFullWeeks; i < l; i += 1) {
      ranges.push(7);
    }
    const remainingNumberOfDays = numberOfDaysInMonth - (firstSlice + (7 * numberOfFullWeeks));
    remainingNumberOfDays !== 0 && ranges.push(remainingNumberOfDays);

    const totalsByWeek = [];

    let dayShifter = 0;
    for (let slice_i = 0, l = ranges.length; slice_i < l; slice_i += 1) {
      totalsByWeek[slice_i] = 0;
      let tempTotal = 0;
      for (let day_of_slice_i = 0, n = ranges[slice_i]; day_of_slice_i < n; day_of_slice_i += 1) {
        const spendingByDay = monthSpending.filter(o => {
          return format(o.date, 'yyyy-MM-dd') === format(new Date(getYear(startDate), getMonth(startDate), (day_of_slice_i + 1) + dayShifter) , 'yyyy-MM-dd');
        });
        tempTotal = spendingByDay.reduce((acc, curr) => acc + +curr.amount, 0); // cast +curr.amount because amount which a number is seen as an object, dunno why...
        if (spendingByDay.length !== 0) {
          totalsByWeek[slice_i] += tempTotal;
        }
      }
      dayShifter += ranges[slice_i];
    }
    return totalsByWeek;
  }

  const monthSpending = await prisma.spendings.findMany({
    where: {
      AND: [
        { userID },
        {
          date: {
            gte: startDate,
            lte: endOfMonth(startDate),
          },
        },
      ]
    }
  });

  const weeklyStats = makeRange(monthSpending);

  res.status(200).json(weeklyStats);
}

module.exports = weeklystatsController;
