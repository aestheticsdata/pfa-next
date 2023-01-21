import { useEffect, useState } from "react";
import { endOfMonth } from "date-fns";
import startOfMonth from "date-fns/startOfMonth";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import useDashboard from "@components/spendings/services/useDashboard";
import SpendingDashboard from "@components/spendings/spendingDashboard/SpendingDashboard";
import useSpendings from "@components/spendings/services/useSpendings";
import useInitialAmount from "@components/spendings/services/useInitialAmount";
import SpendingDayItem from "@components/spendings/spendingDayItem/SpendingDayItem";

import type { MonthRange } from "@components/spendings/interfaces/spendingDashboardTypes";

const Spendings = () => {
  const [month, setMonth] = useState<MonthRange>();
  const { from, to, range } = useDatePickerWrapperStore();

  const { spendingsByWeek, spendingsByMonth, isLoading: isSpendingsLoading } = useSpendings();

  // const { get: { data: dashboard } } = useDashboard();

  // const { data: initialAmount } = useInitialAmount();

  useEffect(() => {
    if (from && to) {
      setMonth({
        start: startOfMonth(from),
        end: endOfMonth(to),
      })
    }
  }, [from, to]);

  useEffect(() => {
    console.log("spendings by week", spendingsByWeek);
    console.log("spendings by month", spendingsByMonth);
  }, [spendingsByWeek, spendingsByMonth]);

  return (
    <>
      {month &&
        <>
          <SpendingDashboard month={month} />
          <div className="flex justify-center w-full">
            <div className="flex flex-wrap justify-start mt-36 md:mt-96 md:pl-1 w-full md:w-11/12 space-y-2">
              {spendingsByWeek?.map((spending: any, i:number) =>
                  <SpendingDayItem
                    key={i}
                    spendingsByDay={spending}
                    date={range![i]}
                    isLoading={isSpendingsLoading}
                  />
                )
              }
            </div>
          </div>
        </>
      }
    </>
  );
};

export default Spendings;
