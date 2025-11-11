import useRequestHelper from "@helpers/useRequestHelper";
import { useUserStore } from "@auth/store/userStore";
import { useAuthStore } from "@auth/store/authStore";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import { useQuery } from "react-query";
import { QUERY_KEYS, QUERY_OPTIONS } from "@components/spendings/config/constants";
import startOfMonth from "date-fns/startOfMonth";


const useInitialAmount = () => {
  const { privateRequest } = useRequestHelper();
  const user = useUserStore((state) => state.user);
  const userID = user?.id;
  const token = useAuthStore((state) => state.token);
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

  return useQuery([QUERY_KEYS.INITIAL_AMOUNT, monthBeginning], getInitialAmount, {
    retry: false,
    enabled: !!from && !!userID && !!token,
    ...QUERY_OPTIONS,
  });
}

export default useInitialAmount;
