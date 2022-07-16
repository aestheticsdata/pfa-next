import { useQuery, useMutation, useQueryClient } from "react-query";
import useRequestHelper from "@src/helpers/useRequestHelper";
import formatISO from "date-fns/formatISO";
import parseISO from "date-fns/parseISO";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import { useUserStore } from "@auth/store/userStore";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import { QUERY_KEYS, QUERY_OPTIONS } from "@components/spendings/config/constants";
import type { UseQueryResult } from "react-query";
import { start } from "repl";


export interface DashBoard {
  ID: string;
  dateFrom: string;
  dateTo: string;
  initialAmount: string;
  initialCeiling: string;
  userID: string;
}

export interface DashBoardData {
  data: DashBoard;
}

interface UseDashboard {
  get: UseQueryResult<DashBoardData>;
  mutation: any;
}


const useDashboard = (): UseDashboard => {
  const { privateRequest } = useRequestHelper();
  const userID = useUserStore((state) => state.user!.id);
  const { from } = useDatePickerWrapperStore();
  const monthBeginning = startOfMonth(from!);
  const queryClient = useQueryClient();

  const getDashboard = async () => {
    return privateRequest(
      `/dashboard?userID=${userID}&start=${startOfMonth(from!)}`
    );
  };

  const setInitialSalary = async (amount: string) => {
    return privateRequest(
      '/dashboard', {
        method: 'POST',
        data: {
          userID,
          amount,
          start: formatISO(startOfMonth(from!), { representation: "date" }),
          end: formatISO(endOfMonth(from!), { representation: "date" }),
        }
      }
    )
  }

  const updateInitialSalary = async (dashboardID: string, amount: string) => {
    return privateRequest(
      `/dashboard/${dashboardID}`, {
        method: 'PUT',
        data: {
          userID,
          amount,
        },
      }
    )
  }

  const get = useQuery([QUERY_KEYS.DASHBOARD, monthBeginning], getDashboard, {
    retry: false,
    enabled: !!from,
    ...QUERY_OPTIONS,
  });

  const mutation = useMutation(({ dashboardID, initialAmount }) => {
    if (dashboardID) {
      return updateInitialSalary(dashboardID, initialAmount);
    } else {
      return setInitialSalary(initialAmount);
    }
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["dashboard", monthBeginning]);
    }
  });

  return {
    get,
    mutation,
  }
};

export default useDashboard;

/*

 const onSubmit = (values, { setSubmitting }) => {
    const formattedMonth = {
      start: format(startOfMonth(dateRange.from), 'yyyy-MM-dd'),
      end: format(endOfMonth(dateRange.to), 'yyyy-MM-dd'),
    };
    dashboardID ?
      dispatch(updateInitialAmountAction(dashboardID, user.id, values.initialAmount))
      :
      dispatch(setInitialAmountAction(user.id, values.initialAmount, formattedMonth));
    setIsInputVisible(false);
    setSubmitting(false);
  };


  function* onSetInitialAmount(payload) {
  try {
    const res = yield call(privateRequest, '/dashboard', {
      method: 'POST',
      data: {
        userID: payload.userID,
        amount: payload.amount,
        ...payload.month,
      }
    });
    displayPopup({ text: intl.formatMessage({ ...messages.initialAmountSetSuccess }) });
    yield monthlyStatHelper(res, payload);
  } catch (err) {
    console.log('Error setting initial amount', err);
  }
}

function* onUpdateInitialAmount(payload) {
  try {
    const res = yield call(privateRequest, `/dashboard/${payload.dashboardID}`, {
      method: 'PUT',
      data: {
        userID: payload.userID,
        amount: payload.amount,
      },
    });
    displayPopup({ text: intl.formatMessage({ ...messages.initialAmountSetSuccess }) });
    yield monthlyStatHelper(res, payload);
  } catch (err) {
    console.log('Error setting initial amount', err);
  }
}

 */
