import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import startOfMonth from "date-fns/startOfMonth";
import { displayPopup } from "@helpers/swalHelper";
import useRequestHelper from "@helpers/useRequestHelper";
import { useUserStore } from "@auth/store/userStore";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import { QUERY_KEYS, QUERY_OPTIONS } from "@components/spendings/config/constants";

import type { Spending } from "@components/spendings/interfaces/spendingDashboardTypes";


interface CreateRecurring {
  spendingEdited: Spending;
  formattedMonth: {
    start: string;
    end: string;
  };
}

const useReccurings = () => {
  const { privateRequest } = useRequestHelper();
  const userID = useUserStore((state) => state.user!.id);
  const { from } = useDatePickerWrapperStore();
  const monthBeginning = startOfMonth(from!);
  const [recurrings, setRecurrings] = useState();


  const recurringsActionOnSuccess = async (message: string) => {
    displayPopup({ text: `recurring ${message}`});
    await queryClient.invalidateQueries([QUERY_KEYS.RECURRINGS, monthBeginning]);
    await queryClient.invalidateQueries([QUERY_KEYS.DASHBOARD, monthBeginning]);
    await queryClient.invalidateQueries([QUERY_KEYS.INITIAL_AMOUNT, monthBeginning]);
  }

  const getRecurrings = async () => {
    try {
      return privateRequest(
        `/recurrings?userID=${userID}&start=${startOfMonth(from!)}`
      );
    } catch (e) {
      console.log("get recurrings error", e);
    }
  }

  const { data, isLoading } = useQuery([QUERY_KEYS.RECURRINGS, monthBeginning], getRecurrings, {
    retry: false,
    enabled: !!from,
    ...QUERY_OPTIONS,
  });

  useEffect(() => {
    setRecurrings(data?.data);
  }, [data]);

  const queryClient = useQueryClient();

  const deleteRecurringService = async (recurring: Spending) => {
    return privateRequest(`/recurrings/${recurring.ID}`, {method: "DELETE"});
  }

  const deleteRecurring = useMutation(({ recurring }: { recurring: Spending }) => {
    return deleteRecurringService(recurring);
  }, {
    onSuccess: () => recurringsActionOnSuccess("effacé"),
    onError: ((e) => {console.log("error deleting recurring", e)}),
  });

  const createRecurringService = async (recurring: Spending, formattedMonth: any) => {
    return privateRequest("/recurrings", {
      method: "POST",
      data: {
        ...recurring,
        ...formattedMonth,
      }
    })
  };

  const createRecurring = useMutation(({ spendingEdited, formattedMonth }: CreateRecurring) => {
    return createRecurringService(spendingEdited, formattedMonth);
  }, {
    onSuccess: () => recurringsActionOnSuccess("créé"),
    onError: ((e) => {console.log("error creating recurring", e)}),
  });

  const updateRecurringService = async (recurring) => {
    return privateRequest(`/recurrings/${recurring.id}`, {
      method: "PUT",
      data: recurring,
    });
  };

  const updateRecurring = useMutation((recurring) => {
    return updateRecurringService(recurring);
  }, {
    onSuccess: () => { recurringsActionOnSuccess("mis à jour") },
    onError: (e) => { console.log("error updating recurring ", e);
    }
  });

  return {
    recurrings,
    isLoading,
    deleteRecurring,
    createRecurring,
    updateRecurring,
  }
}

export default useReccurings;
