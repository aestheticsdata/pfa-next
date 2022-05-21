import {
  deleteRecurring as deleteRecurringAction,
  deleteSpending as deleteSpendingAction,
  getSpendings,
  getCategories as getCategoriesAction,
  getWeeklyStats as getWeeklyStatsAction,
} from "@components/spendings/actions";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Month } from "@components/spendings/types";
import useSpendingsSelectorHelper from "@components/spendings/selectors";

const useSpendingsHelpers = () => {
  const [month, setMonth] = useState<Month>(null);
  const dispatch = useDispatch();
  const {
    user,
    dateRange,
  } = useSpendingsSelectorHelper();

  const start = startOfMonth(dateRange.from);

  const getCategories = () => {
    dispatch(getCategoriesAction());
  };

  const getSpendingsAndRecurring = () => {
    dispatch(getSpendings(user, dateRange));

    const start = startOfMonth(dateRange.from);
    const end = endOfMonth(dateRange.to);

    setMonth({ start, end });
  };

  const deleteSpending = (spendingID: string) => {
    dispatch(deleteSpendingAction(spendingID));
  };

  const deleteRecurring = (recurringID: string) => {
    dispatch(deleteRecurringAction(recurringID));
  };

  const deleteItem = (itemID: string, itemType: string) => {
    itemType === 'spending' ?
      deleteSpending(itemID)
      :
      deleteRecurring(itemID);
  };

  const getWeeklyStats = (start: Date) => {
    dispatch(getWeeklyStatsAction(start));
  }

  return {
    month,
    start,
    getCategories,
    getSpendingsAndRecurring,
    deleteSpending,
    deleteRecurring,
    deleteItem,
    getWeeklyStats,
  }
}

export default useSpendingsHelpers;
