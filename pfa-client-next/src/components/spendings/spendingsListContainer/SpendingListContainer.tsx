import { useEffect, useState } from "react";
import SpendingItem from "@components/spendings/spendingDayItem/spendingItem/SpendingItem";

import type { SpendingsListContainerType } from "@components/spendings/types";
import Spinner from "@components/common/Spinner";


const SpendingsListContainer = ({
  spendingsByDaySorted,
  deleteSpending,
  toggleAddSpending,
  editSpending,
  isLoading,
  recurringType
}: SpendingsListContainerType) => {
  const [spendings, setSpendings] = useState<any>();

  useEffect(() => {
    setSpendings(spendingsByDaySorted);
  }, [recurringType, spendingsByDaySorted]);

  return (
  <div className={`space-y-1 ${recurringType ? 'recurrings' : 'spendings'}-list-container overflow-auto ${recurringType ? "h-[150px] w-[390px] px-2" : "h-[210px]"}`}>
    {
      spendings?.length > 0 ?
        isLoading ?
          <div className="flex justify-center items-center h-[220px]">
            <Spinner />
          </div>
          :
          // spendingsByDay.map((spending: SpendingType) => {
          spendings.map((spending: any) => (
              <SpendingItem
                key={spending.ID}
                spending={spending}
                editCallback={editSpending}
                deleteCallback={deleteSpending}
                toggleAddSpending={toggleAddSpending}
                isRecurring={recurringType}
              />
            )
          )
        :
        null
    }
  </div>
)};

export default SpendingsListContainer;
