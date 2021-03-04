const eachDayOfInterval = require('date-fns/eachDayOfInterval');
const format = require('date-fns/format');
const has = require('lodash/has');

const buildRange = (dates, start, end) => {
  const valuesByDate = dates.reduce((acc, { value, date }) => ({ ...acc, [date]: value }), {});
  const period = eachDayOfInterval({ start: new Date(start), end: new Date(end) });
  return period.map((date) => {
    const formattedDate = format(new Date(date), 'dd.MM.yyyy');
    const value = has(valuesByDate, formattedDate) ? valuesByDate[formattedDate] : 0;
    return { value, date: formattedDate };
  });
};

module.exports = buildRange;
