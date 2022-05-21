import useRequestHelper from "@helpers/useRequestHelper";
import { useUserStore } from "@auth/store/userStore";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import { useQuery } from "react-query";
import { QUERY_OPTIONS } from "@components/spendings/config/constants";
import startOfMonth from "date-fns/startOfMonth";


const useReccurings = () => {
  const { privateRequest } = useRequestHelper();
  const userID = useUserStore((state) => state.user!.id);
  const { from, to } = useDatePickerWrapperStore();
  const monthBeginning = startOfMonth(from!);

  const getRecurrings = async () => {
    try {
      return privateRequest(
        `/recurrings?userID=${userID}&start=${startOfMonth(from!)}`
      );
    } catch (e) {
      console.log("get recurrings error", e);
    }
  }

  return useQuery(["recurrings", monthBeginning], getRecurrings, {
    retry: false,
    enabled: !!from,
    ...QUERY_OPTIONS,
  });
}

export default useReccurings;
