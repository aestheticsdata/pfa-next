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


const Spendings = () => {
  const [month, setMonth] = useState<MonthRange>();
  const { from, to } = useDatePickerWrapperStore();

  const { data: spendings, isLoading: isSpendingsLoading } = useSpendings();

  const { data: categories } = useCategories();

  const { data: dashboard } = useDashboard();

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
