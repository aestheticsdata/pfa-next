import useDatePickerStore from "@components/datePickerWrapper/store";
import useDashboard from "@components/spendings/services/useDashboard";
import { useQuery } from "react-query";
import { QUERY_OPTIONS } from "@components/spendings/config/constants";
import SpendingDashboard from "@components/spendings/spendingDashboard/SpendingDashboard";
import startOfMonth from "date-fns/startOfMonth";
import { useEffect, useState } from "react";
import { endOfMonth } from "date-fns";
import type { MonthRange } from "@components/spendings/interfaces/spendingDashboardTypes";


const Spendings = () => {
  const [month, setMonth] = useState<MonthRange>();
  const { from, to } = useDatePickerStore();
  const { getCategories, getSpendings, getDashboard, getRecurrings } = useDashboard();

  const { data: spendings, isLoading: isSpendingsLoading } = useQuery("spendings", getSpendings, {
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
  console.log("spendings", spendings?.data);

  const { data: categories } = useQuery("categories", getCategories, {
    retry: false,
    ...QUERY_OPTIONS,
  });
  console.log("categories", categories?.data);


  const { data: dashboard } = useQuery("dashboard", getDashboard, {
    retry: false,
    enabled: !!from,
    ...QUERY_OPTIONS,
  });
  console.log("dashboard", dashboard?.data);

  const { data: recurrings } = useQuery("recurrings", getRecurrings, {
    retry: false,
    enabled: !!from,
    ...QUERY_OPTIONS,
  });
  console.log("recurrings", recurrings?.data);

  useEffect(() => {
    if (from && to) {
      setMonth({
        start: startOfMonth(from),
        end: endOfMonth(to),
      })
    }
  }, [from, to]);

  return (
    <>
      {
        month &&
          <div className="w-full">
            <SpendingDashboard
              recurring={recurrings}
              month={month}
              isLoading={isSpendingsLoading}
            />
          </div>
      }
    </>
  );
};

export default Spendings;
