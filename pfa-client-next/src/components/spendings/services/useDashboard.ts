import useRequestHelper from "@src/helpers/useRequestHelper";
import startOfMonth from "date-fns/startOfMonth";
import { useUserStore } from "@auth/store/userStore";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";

const useDashboard = () => {
  const { privateRequest } = useRequestHelper();
  const user = useUserStore((state) => state.user);
  const { from, to } = useDatePickerWrapperStore();

  const getDashboard = async () => {
    const userID = user!.id;
    return privateRequest(
      `/dashboard?userID=${userID}&start=${startOfMonth(from!)}`
    );
  };

  const getSpendings = async () => {
    try {
      const userID = user!.id;
      return privateRequest(
        `/spendings?userID=${userID}&from=${from}&to=${to}`
      );
    } catch (e) {
      console.log("get spendings error", e);
    }
  };

  const getRecurrings = async () => {
    try {
      const userID = user!.id;
      return privateRequest(
        `/recurrings?userID=${userID}&start=${startOfMonth(from!)}`
      );
    } catch (e) {
      console.log("get recurrings error", e);
    }
  }
//  const start = startOfMonth(dateRange.from);
  const getCategories = async () => {
    try {
      const userID = user!.id;
      return privateRequest(`/categories?userID=${userID}`);
    } catch (e) {
      console.log("get categories error : ", e);
    }
  };

  return {
    getDashboard,
    getSpendings,
    getCategories,
    getRecurrings,
  };
};

export default useDashboard;
