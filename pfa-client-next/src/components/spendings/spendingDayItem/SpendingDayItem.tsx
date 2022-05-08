import { useEffect } from "react";
import format from 'date-fns/format';
import { getDayOfYear } from "date-fns";
import fr from "date-fns/locale/fr";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import useSpendingDayItem from "@components/spendings/spendingDayItem/spendingItem/helpers/useSpendingDayItem";
import SpendingItemHeader from "@components/spendings/spendingDayItem/SpendingItemHeader";
import useClickSort from "@components/spendings/helpers/useClickSort";
import { SpendingCompoundType } from "@components/spendings/types";
import spendingsText from "@components/spendings/config/text";
import SpendingsListContainer from "@components/spendings/spendingsListContainer/SpendingListContainer";

interface SpendingDayItemProps {
  spendingsByDay: any;
  deleteSpending: () => {};
  isLoading: boolean;
  date: Date;
  recurringType: boolean;
  user: any;
  month: any;
}


const SpendingDayItem = ({ spendingsByDay, deleteSpending, isLoading, date, recurringType = false, user, month = null }: SpendingDayItemProps) => {
  const isToday = getDayOfYear(date) === getDayOfYear(Date.now());
  const {
    onClickSort,
    spendingsByDaySorted,
    setSpendingsByDaySorted,
  } = useClickSort();

  useEffect(() => {
    setSpendingsByDaySorted(spendingsByDay);
  }, [spendingsByDay]);

  const getRecurringsTotal = (recurrings: SpendingCompoundType) => {
    if (recurrings?.data?.length > 0) {
      return recurrings.data.reduce((acc, curr) => {
        acc = acc + Number(curr.amount);
        return acc;
      }, 0);
    }
    return 0;
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
    <div className={`rounded bg-spendingDayBackground border ${isToday ? "border-datePickerWrapper" : "border-grey2"} ${
      recurringType
        ? "md:w-[400px] h-[265px]"
        : "md:w-[490px] h-[300px] m-2"
    }`}>
      <div className="flex flex-col">
        <SpendingItemHeader
          date={date}
          recurringType={recurringType}
          isToday={isToday}
          addSpending={addSpending}
          addSpendingEnabled={addSpendingEnabled}
        />
        <div
          className="total"
        >
          {spendingsByDaySorted &&
            <div className="flex justify-center gap-x-2 text-md font-poppins border-b border-b-grey3 mx-3">
              <div className="uppercase">{spendingsText.dayItem.total}</div>
              <div className="total-amount font-bold">
                {recurringType
                  ?
                  <div>{Number(getRecurringsTotal(spendingsByDaySorted)).toFixed(2)} €</div>
                  :
                  <div>{Number(spendingsByDaySorted.total).toFixed(2)} €</div>
                }
              </div>
            </div>
          }
        </div>
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

