import SpendingDayItem from '@components/spendings/spendingDayItem/SpendingDayItem';
import MonthlyBudget from '@components/spendings/spendingDashboard/monthlyBudget/MonthlyBudget';
import WeeklyStats from "@components/spendings/spendingDashboard/weeklyStats/WeeklyStats";
import WeeklyCharts from "@components/spendings/spendingDashboard/weeklyCharts/WeeklyCharts";
import MonthlyCharts from "@components/spendings/spendingDashboard/monthlyCharts/MonthlyCharts";
import { useUserStore } from "@auth/store/userStore";
import useReccurings from "@components/spendings/services/useReccurings";

import type { MonthRange } from "@components/spendings/interfaces/spendingDashboardTypes";

interface SpendingDashboardProps {
  month: MonthRange;
}

const SpendingDashboard = ({ month }: SpendingDashboardProps) => {
  const user = useUserStore((state) => state.user);
  const { recurrings, isLoading: isRecurringsLoading, deleteRecurring } = useReccurings();

  return (
    <div className="hidden md:flex justify-around mt-14 items-center w-full h-72 bg-grey2 z-30 fixed border-t-2 border-b-2 border-t-grey1 border-b-grey1 shadow-dashboard">
      <WeeklyStats />
      <MonthlyBudget />
      <MonthlyCharts />
      <WeeklyCharts />
      <SpendingDayItem
        spendingsByDay={recurrings}
        total={0}
        isLoading={isRecurringsLoading}
        deleteSpending={deleteRecurring}
        user={user}
        recurringType
        month={month}
      />
    </div>
  )
}

export default SpendingDashboard;

