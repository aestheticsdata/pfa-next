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


const SpendingDayItem = ({ spendingsByDay, total, isLoading, user, recurringType = false, month, date }) => {
  const isToday = getDayOfYear(date) === getDayOfYear(Date.now());
  const {
    onClickSort,
    spendingsByDaySorted,
    setSpendingsByDaySorted,
  } = useClickSort();

  useEffect(() => {
    setSpendingsByDaySorted(spendingsByDay);
  }, [spendingsByDay]);

  const getRecurringsTotal = (recurrings: SpendingCompoundType) => _.sumBy(recurrings, item => parseFloat(item.amount));
  // const getRecurringsTotal = (recurrings: SpendingCompoundType) => recurrings.reduce((acc, curr) => {acc = acc + Number(curr.amount).toFixed(2); return acc}, 0);
  // const getRecurringsTotal = () => {};


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
    <div className={`rounded bg-grey0 border ${isToday ? "border-datePickerWrapper" : "border-grey2"} ${
      recurringType
        ? "md:w-[370px] h-[265px]"
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
                  <div>{getRecurringsTotal(spendingsByDaySorted)} €</div>
                  :
                  <div>{Number(spendingsByDaySorted.total).toFixed(2)} €</div>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default SpendingDayItem;

