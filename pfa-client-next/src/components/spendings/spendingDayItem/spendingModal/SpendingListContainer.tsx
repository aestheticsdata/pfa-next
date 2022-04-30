// @ts-nocheck
import { ReactComponent as Spinner } from "@src/assets/Wedges-3s-200px.svg";
import SpendingItem from "@components/spendings/spendingDayItem/spendingItem/SpendingItem";

import { SpendingsListContainerType, SpendingType} from "../../types";

const SpendingListContainer = (
  {
    spendingsByDaySorted,
    deleteSpending,
    toggleAddSpending,
    editSpending,
    isLoading,
    recurringType
  }: SpendingsListContainerType
) => {
  return (
  <div className={`${recurringType ? 'recurrings' : 'spendings'}-list-container`}>
    {
      spendingsByDaySorted ?
        isLoading ?
          <div className="spinner">
            <Spinner width="60px" height="60px" />
          </div>
          :
          // spendingsByDay.map((spending: SpendingType) => {
          spendingsByDaySorted.map((spending: any) => (
              <SpendingItem
                key={spending.ID}
                spending={spending}
                editCallback={editSpending}
                deleteCallback={deleteSpending}
                toggleAddSpending={toggleAddSpending}
              />
            )
          )
        :
        null
    }
  </div>
)};

export default SpendingListContainer;
