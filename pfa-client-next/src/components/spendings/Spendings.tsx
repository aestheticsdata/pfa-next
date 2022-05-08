import { useEffect, useState } from "react";
import { endOfMonth } from "date-fns";
import startOfMonth from "date-fns/startOfMonth";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import useDashboard from "@components/spendings/services/useDashboard";
import SpendingDashboard from "@components/spendings/spendingDashboard/SpendingDashboard";
import useSpendings from "@components/spendings/services/useSpendings";
import useReccurings from "@components/spendings/services/useReccurings";
import useInitialAmount from "@components/spendings/services/useInitialAmount";
import useCategories from "@components/spendings/services/useCategories";
import type { MonthRange } from "@components/spendings/interfaces/spendingDashboardTypes";
import SpendingDayItem from "@components/spendings/spendingDayItem/SpendingDayItem";


const Spendings = () => {
  const [month, setMonth] = useState<MonthRange>();
  const { from, to, range } = useDatePickerWrapperStore();

  const { spendings, isLoading: isSpendingsLoading } = useSpendings();

  const { data: categories } = useCategories();

  const { get: { data: dashboard } } = useDashboard();

  const { data: recurrings } = useReccurings();

  const { data: initialAmount } = useInitialAmount();

  useEffect(() => {
    if (from && to) {
      setMonth({
        start: startOfMonth(from),
        end: endOfMonth(to),
      })
    }
  }, [from, to]);

  useEffect(() => {
    console.log("spendings", spendings);
  }, [spendings]);

  return (
    <>
      {
        month &&
        <>
          <SpendingDashboard
            recurring={recurrings}
            month={month}
            isLoading={isSpendingsLoading}
          />
          <div className="flex justify-center w-full">
            <div className="flex flex-wrap justify-start md:mt-96 pl-1 w-11/12">
              {spendings?.map((spending: any, i:number) =>
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
