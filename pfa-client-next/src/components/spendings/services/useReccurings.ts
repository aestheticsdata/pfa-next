import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import useRequestHelper from "@helpers/useRequestHelper";
import { useUserStore } from "@auth/store/userStore";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import { QUERY_KEYS, QUERY_OPTIONS } from "@components/spendings/config/constants";
import startOfMonth from "date-fns/startOfMonth";
import { Spending } from "@components/spendings/interfaces/spendingDashboardTypes";


const useReccurings = () => {
  const { privateRequest } = useRequestHelper();
  const userID = useUserStore((state) => state.user!.id);
  const { from, to } = useDatePickerWrapperStore();
  const monthBeginning = startOfMonth(from!);
  const [recurrings, setRecurrings] = useState();

  const getRecurrings = async () => {
    try {
      return privateRequest(
        `/recurrings?userID=${userID}&start=${startOfMonth(from!)}`
      );
    } catch (e) {
      console.log("get recurrings error", e);
    }
  }

  const { data, isLoading } =  useQuery([QUERY_KEYS.RECURRINGS, monthBeginning], getRecurrings, {
    retry: false,
    enabled: !!from,
    ...QUERY_OPTIONS,
  });

  useEffect(() => {
    setRecurrings(data?.data);
  }, [data]);

  const queryClient = useQueryClient();

  const deleteRecurringService = async (recurring: Spending) => {
    return privateRequest(`/spendings/${recurring.ID}`, {method: "DELETE"});
  }

  const deleteRecurring = useMutation(({ recurring }: { recurring: Spending }) => {
    return deleteRecurringService(recurring);
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([QUERY_KEYS.RECURRINGS, from, to]);
    }
  });

  return {
    recurrings,
    isLoading,
    deleteRecurring,
  }
}

export default useReccurings;
