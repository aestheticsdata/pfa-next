import useRequestHelper from "@helpers/useRequestHelper";
import { useUserStore } from "@auth/store/userStore";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import { useQuery } from "react-query";
import { QUERY_OPTIONS } from "@components/spendings/config/constants";
import startOfMonth from "date-fns/startOfMonth";


const useInitialAmount = () => {
  const { privateRequest } = useRequestHelper();
  const userID = useUserStore((state) => state.user!.id);
  const { from } = useDatePickerWrapperStore();
  const monthBeginning = startOfMonth(from!);

  const getInitialAmount = async () => {
    try {
      const monthlyStats = await privateRequest(`/monthlystats?userID=${userID}&from=${startOfMonth(from!)}`);
      return monthlyStats.data;
    } catch (e) {
      console.log("get initial amount error : ", e);
    }
  };

  return useQuery(["initialAmount", monthBeginning], getInitialAmount, {
    retry: false,
    enabled: !!from,
    ...QUERY_OPTIONS,
  });
}

export default useInitialAmount;
