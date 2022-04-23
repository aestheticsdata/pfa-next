import useRequestHelper from "@helpers/useRequestHelper";
import { useUserStore } from "@auth/store/userStore";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import { useQuery } from "react-query";
import { QUERY_OPTIONS } from "@components/spendings/config/constants";
import startOfMonth from "date-fns/startOfMonth";


const useWeeklyStats = () => {
  const { privateRequest } = useRequestHelper();
  const userID = useUserStore((state) => state.user!.id);
  const { from } = useDatePickerWrapperStore();
  const monthBeginning = startOfMonth(from!);

  const getWeeklyStats = async () => {
    try {
      return privateRequest(`/weeklystats?userID=${userID}&start=${startOfMonth(from!)}`);
    } catch (e) {
      console.log("get weekly stats error : ", e);
    }
  };

  return useQuery(["weeklyStats", monthBeginning], getWeeklyStats, {
    retry: false,
    enabled: !!from,
    ...QUERY_OPTIONS,
  });
}

export default useWeeklyStats;
