import { useEffect } from "react";
import format from 'date-fns/format';
import { getDayOfYear } from "date-fns";
import fr from "date-fns/locale/fr";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import useSpendingDayItem from "@components/spendings/spendingDayItem/spendingItem/helpers/useSpendingDayItem";
import SpendingItemHeader from "@components/spendings/spendingDayItem/SpendingItemHeader";
import useClickSort from "@components/spendings/helpers/useClickSort";
import spendingsText from "@components/spendings/config/text";
import SpendingsListContainer from "@components/spendings/spendingsListContainer/SpendingListContainer";
import SpendingSort from "@components/spendings/spendingSort/SpendingSort";
import SpendingModal from "@components/spendings/common/spendingModal/SpendingModal"

import type { SpendingCompoundType } from "@components/spendings/types";

interface SpendingDayItemProps {
  spendingsByDay: any;
  deleteSpending: any;
  isLoading: boolean;
  date?: Date;
  user: any; // TODO
  recurringType: boolean;
  month: any;
  total: number;
}


const SpendingDayItem = ({ spendingsByDay, deleteSpending, isLoading, date, recurringType = false, month = null }: SpendingDayItemProps) => {
  const isToday = getDayOfYear(date!) === getDayOfYear(Date.now());
  const {
    onClickSort,
    spendingsByDaySorted,
    setSpendingsByDaySorted,
  } = useClickSort();

  useEffect(() => {
    setSpendingsByDaySorted(spendingsByDay);
  }, [spendingsByDay]);

  const getRecurringsTotal = (recurrings: SpendingCompoundType) => {
    if (recurrings?.length > 0) {
      return recurrings.reduce((acc, curr) => {
        acc = acc + Number(curr.amount);
        return acc;
      }, 0);
    }
  }


  const {
    isModalVisible,
    addSpendingEnabled,
    spending,
    isEditing,
    addSpending,
    closeModal,
    toggleAddSpending,
    editSpending,
  } = useSpendingDayItem();


  return (
    <div
      className={`rounded bg-spendingDayBackground border ${isToday ? "shadow-spendingDaySelected" : "border-grey2"}
      ${recurringType
        ? "w-full md:w-[400px] h-[265px]"
        : "w-full md:w-[490px] h-[330px] md:m-2"
      }`}
    >
      <div className="flex flex-col">
        <div className="relative">
          {
            isModalVisible ?
              <SpendingModal
                date={date}
                closeModal={closeModal}
                spending={spending}
                recurringType={recurringType}
                isEditing={isEditing}
                month={month}
              />
              :
              null
          }
        </div>
        <SpendingItemHeader
          date={date!}
          recurringType={recurringType}
          isToday={isToday}
          addSpending={addSpending}
          addSpendingEnabled={addSpendingEnabled}
        />
        <div>
          {spendingsByDaySorted &&
            <div className="flex justify-center gap-x-2 text-md font-poppins border-b border-b-grey3 mx-3">
              <div className="uppercase">{spendingsText.dayItem.total}</div>
              <div className="total-amount font-bold">
                {recurringType
                  ?
                  <div>{Number(getRecurringsTotal(spendingsByDaySorted) || 0).toFixed(2)} €</div>
                  :
                  <div>{Number(spendingsByDaySorted.total).toFixed(2)} €</div>
                }
              </div>
            </div>
          }
        </div>
        <SpendingSort
          recurringType={recurringType}
          onClickSort={onClickSort}
        />
        <div className="flex flex-col mt-2">
          <SpendingsListContainer
            spendingsByDaySorted={spendingsByDaySorted}
            deleteSpending={deleteSpending}
            toggleAddSpending={toggleAddSpending}
            editSpending={editSpending}
            isLoading={isLoading}
            recurringType={recurringType}
          />
        </div>
      </div>
    </div>
  );
};

export default SpendingDayItem;

