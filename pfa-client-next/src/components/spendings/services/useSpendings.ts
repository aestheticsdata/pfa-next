import useRequestHelper from "@helpers/useRequestHelper";
import { useUserStore } from "@auth/store/userStore";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import { useQuery } from "react-query";
import { QUERY_OPTIONS } from "@components/spendings/config/constants";


const useSpendings = () => {
  const { privateRequest } = useRequestHelper();
  const userID = useUserStore((state) => state.user!.id);
  const { from, to } = useDatePickerWrapperStore();

  const getSpendings = async () => {
    try {
      return privateRequest(
        `/spendings?userID=${userID}&from=${from}&to=${to}`
      );
    } catch (e) {
      console.log("get spendings error", e);
    }
  };

   return useQuery(["spendings", from, to], getSpendings, {
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
}

export default useSpendings;
