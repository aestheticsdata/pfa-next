import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import getDate from "date-fns/getDate";
import parseISO from "date-fns/parseISO";
import startOfMonth from "date-fns/startOfMonth";
import useRequestHelper from "@helpers/useRequestHelper";
import { useUserStore } from "@auth/store/userStore";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import { QUERY_KEYS, QUERY_OPTIONS } from "@components/spendings/config/constants";

import type { SpendingCompoundType } from "@components/spendings/types";
import type { Spending } from "@components/spendings/interfaces/spendingDashboardTypes";

const useSpendings = () => {
  const [spendings, setSpendings] = useState<SpendingCompoundType>();
  const { privateRequest } = useRequestHelper();
  const userID = useUserStore((state) => state.user!.id);
  const { from, to, range } = useDatePickerWrapperStore();
  const monthBeginning = startOfMonth(from!);

  // transform an array of object into an array of array<Object> aggregated
  // by same date
  // const aggregateSpendingByDate = (spendings, range, exchangeRates, baseCurrency) => {
  const aggregateSpendingByDate = (spendings: SpendingCompoundType, range): SpendingCompoundType => {
    const tempArr = [];
    tempArr.total = 0;
    const spendingsPlaceholder = new Array(range.length).fill(tempArr);
    const spendingsFinal = [...spendingsPlaceholder];

    for (let j = 0, r = range.length; j < r; j += 1) {
      const arr: any = [];
      arr.total = 0;
      arr.date = getDate(range[j]);
      spendingsFinal[j] = arr;
    }

    for (let i = 0, l = spendings.length; i < l; i += 1 ) {
      for (let k = 0, ll = spendingsFinal.length; k < ll; k += 1) {
        if (getDate(parseISO(spendings[i].date)) === spendingsFinal[k].date) {
          spendingsFinal[k].push(spendings[i]);
          spendingsFinal[k].total += parseFloat(spendings[i].amount);
        }
      }
    }

    return spendingsFinal;
  };

  const getSpendings = async () => {
    try {
      return privateRequest(
        `/spendings?userID=${userID}&from=${from}&to=${to}`
      );
    } catch (e) {
      console.log("get spendings error", e);
    }
  };

  const { data, isLoading } = useQuery([QUERY_KEYS.SPENDINGS, from, to], getSpendings, {
    retry: false,
    // date store is available when coming from login because DatePicker
    // mounts before Spendings
    // but I don't know why when already logged in, and coming directly to spendings
    // Spendings mounts before DatePickerWrapper, causing from to be undefined and
    // hence this query to fail
    // so enable below
    enabled: !!from,
    ...QUERY_OPTIONS,
  });

  useEffect(() => {
    data?.data && range && setSpendings(aggregateSpendingByDate(data.data, range));
  }, [data, range]);

  const queryClient = useQueryClient();

  const deleteSpendingService = async (spending: Spending) => {
    return privateRequest(`/spendings/${spending.ID}`, {method: "DELETE"});
  }

  const deleteSpending = useMutation(({ spending }: { spending: Spending }) => {
    return deleteSpendingService(spending);
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEYS.SPENDINGS, from, to]);
      await queryClient.invalidateQueries([QUERY_KEYS.WEEKLY_STATS, monthBeginning]);
    }
  });

  return {
    spendings,
    isLoading,
    deleteSpending,
  };
}

export default useSpendings;

