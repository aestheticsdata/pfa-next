// @ts-nocheck
import spinner from "@src/assets/Wedges-3s-200px.svg";
import Image from 'next/image';
import SpendingItem from "@components/spendings/spendingDayItem/spendingItem/SpendingItem";

import type { SpendingsListContainerType, SpendingType} from "../types";
import { useEffect, useState } from "react";


const SpendingsListContainer = (
  {
    spendingsByDaySorted,
    deleteSpending,
    toggleAddSpending,
    editSpending,
    isLoading,
    recurringType
  }: SpendingsListContainerType
) => {
  const [spendings, setSpendings] = useState<any>();

  useEffect(() => {
    if (recurringType) {
      setSpendings(spendingsByDaySorted?.data)
    } else {
      setSpendings(spendingsByDaySorted);
    }
  }, [recurringType, spendingsByDaySorted]);

  return (
  <div className={`space-y-1 ${recurringType ? 'recurrings' : 'spendings'}-list-container overflow-auto ${recurringType ? "h-[180px] w-[390px] px-2" : "h-[200px]"}`}>
    {
      spendings?.length > 0 ?
        isLoading ?
          <div className="flex justify-center items-center h-[220px]">
            <Image
              alt="spinner"
              src={spinner}
              width={60}
              height={60}
            />
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
