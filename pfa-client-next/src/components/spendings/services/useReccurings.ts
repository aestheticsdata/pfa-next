import useRequestHelper from "@helpers/useRequestHelper";
import { useUserStore } from "@auth/store/userStore";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import { useQuery } from "react-query";
import { QUERY_KEYS, QUERY_OPTIONS } from "@components/spendings/config/constants";
import startOfMonth from "date-fns/startOfMonth";
import { useEffect, useState } from "react";


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

  return {
    recurrings,
    isLoading,
  }
}

export default useReccurings;
