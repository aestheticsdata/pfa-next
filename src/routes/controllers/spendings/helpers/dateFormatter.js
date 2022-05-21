const { format } = require('date-fns');

module.exports = (req) => {
  const dateFormat = 'yyyy-MM-dd';
  // best explanation to date in js and timezone :
  // https://stackoverflow.com/questions/48172772/time-zone-issue-involving-date-fns-format
  // another solution to get rid of timezone is just to substring the date without the timezone
  const dateFrom =  new Date(req.query.from);
  const dateFromWithoutTimezone = new Date(dateFrom.valueOf() + dateFrom.getTimezoneOffset() * 60 * 1000);
  const from = format(dateFromWithoutTimezone, dateFormat);

  const dateTo = new Date(req.query.to);
  const dateToWithoutTimezone = new Date(dateTo.valueOf() + dateTo.getTimezoneOffset() * 60 * 1000);
  const to = format(dateToWithoutTimezone, dateFormat);

  return {
    from,
    to,
  };
};

