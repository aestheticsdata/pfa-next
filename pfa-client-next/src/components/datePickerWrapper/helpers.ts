import { WeekRange } from "./types";

import addDays from "date-fns/addDays";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import subDays from "date-fns/subDays";
import startOfMonth from "date-fns/startOfMonth";
import isSameMonth from "date-fns/isSameMonth";
import getDate from "date-fns/getDate";
import getDay from "date-fns/getDay";
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import setHours from "date-fns/setHours";


export const getWeekDays = (weekStart: Date, date: Date): Date[] => {
  const days: Date[] = [weekStart];

  if (
    !isSameMonth(startOfWeek(date), date) ||
    !isSameMonth(endOfWeek(date), date)
  ) {
    if (getDate(date) > 15) {
      for (let i = 1; i <= getDay(lastDayOfMonth(date)); i += 1) {
        days.push(addDays(weekStart, i));
      }
    } else {
      for (let i = 1; i <= 6 - getDay(weekStart); i += 1) {
        days.push(addDays(weekStart, i));
      }
    }
  } else {
    for (let i = 1; i < 7; i += 1) {
      days.push(addDays(weekStart, i));
    }
  }

  return days;
};

export const getWeekRange = (date: Date): WeekRange => {
  let dateRange: WeekRange;

  if (
    !isSameMonth(startOfWeek(date), date) ||
    !isSameMonth(endOfWeek(date), date)
  ) {
    if (getDate(date) > 15) {
      dateRange = {
        // setHours force the 'from" to be at midnight and not noon
        from: setHours(subDays(date, getDay(date)), 0),
        to: lastDayOfMonth(date),
      };
    } else {
      dateRange = {
        from: startOfMonth(date),
        to: endOfWeek(date),
      };
    }
  } else {
    dateRange = {
      from: startOfWeek(date),
      to: endOfWeek(date),
    };
  }

  return dateRange;
};
