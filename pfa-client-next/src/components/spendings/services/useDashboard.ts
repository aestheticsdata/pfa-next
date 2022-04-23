import useRequestHelper from "@src/helpers/useRequestHelper";
import startOfMonth from "date-fns/startOfMonth";
import { useUserStore } from "@auth/store/userStore";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import { useQuery, UseQueryResult } from "react-query";
import { QUERY_OPTIONS } from "@components/spendings/config/constants";


interface DashBoard {
  ID: string
  dateFrom: string;
  dateTo: string;
  initialAmount: string;
  initialCeiling: string;
  userID: string;
}

export interface DashBoardData {
  data: DashBoard;
}


const useDashboard = (): UseQueryResult<DashBoardData> => {
  const { privateRequest } = useRequestHelper();
  const userID = useUserStore((state) => state.user!.id);
  const { from } = useDatePickerWrapperStore();
  const monthBeginning = startOfMonth(from!);

  const getDashboard = async () => {
    return privateRequest(
      `/dashboard?userID=${userID}&start=${startOfMonth(from!)}`
    );
  };

  return useQuery(["dashboard", monthBeginning], getDashboard, {
    retry: false,
    enabled: !!from,
    ...QUERY_OPTIONS,
  });
};

export default useDashboard;
