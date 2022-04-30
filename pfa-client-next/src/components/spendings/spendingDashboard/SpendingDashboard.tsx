import SpendingDayItem from '@components/spendings/spendingDayItem/SpendingDayItem';
import MonthlyBudget from '@components/spendings/spendingDashboard/monthlyBudget/MonthlyBudget';
import WeeklyStats from "@components/spendings/spendingDashboard/weeklyStats/WeeklyStats";
import WeeklyCharts from "@components/spendings/spendingDashboard/weeklyCharts/WeeklyCharts";
import MonthlyCharts from "@components/spendings/spendingDashboard/monthlyCharts/MonthlyCharts";
import { useUserStore } from "@auth/store/userStore";

import type { MonthRange } from "@components/spendings/interfaces/spendingDashboardTypes";

interface SpendingDashboardProps {
  recurring: any;
  month: MonthRange;
  isLoading: boolean;
}

const SpendingDashboard = ({
  recurring,
  month,
  isLoading,
}: SpendingDashboardProps) => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="hidden md:flex justify-around mt-14 items-center w-full h-72 bg-grey2 z-30 fixed border-t-2 border-b-2 border-t-grey1 border-b-grey1 shadow-dashboard">
      <WeeklyStats />
      <MonthlyBudget />
      <MonthlyCharts />
      <WeeklyCharts />
      {/*<div className="w-[360px]">*/}
        <SpendingDayItem
          spendingsByDay={recurring}
          total={0}
          isLoading={isLoading}
          user={user}
          recurringType
          month={month}
        />
      {/*</div>*/}
    </div>
  )
}

export default SpendingDashboard;

