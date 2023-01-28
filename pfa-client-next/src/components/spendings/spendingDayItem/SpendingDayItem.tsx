import { useEffect, useState } from "react";
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

import type { SpendingCompoundType, SpendingType } from "@components/spendings/types";
import { dividerClasses } from "@mui/material";

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
    console.log("spendingsByDay", spendingsByDay);
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

  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {
    if (selectedCategory) {
      const spendingsFilteredByCategory = spendingsByDay.filter(
        (spending: SpendingType) => {
          if (spending.category === null && selectedCategory === "none") return true;
          return spending.category === selectedCategory;
        }
      );
      const total = spendingsFilteredByCategory.length > 0 ? spendingsFilteredByCategory.reduce((acc, spending) => {
        return Number(spending.amount) + acc;
      }, 0) : 0;
      spendingsFilteredByCategory.total = total.toFixed(2);
      setSpendingsByDaySorted(spendingsFilteredByCategory);
    } else {
      setSpendingsByDaySorted(spendingsByDay);
    }
  }, [selectedCategory]);

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
        <div className="flex space-x-2 border-b border-b-grey1 mx-3">
          {spendingsByDay &&
            Array.from(new Set(spendingsByDay.map((spending: SpendingType) => spending.category)))
              .map(
                // @ts-ignore
                (category: string | null) =>
                  <div
                    key={(new Date()).getMilliseconds() + Math.trunc(Math.random()*1000000)}
                    className="hover:bg-grey1 cursor-pointer"
                    onClick={() => {
                      if (!category) category = "none"
                      setSelectedCategory(category);
                    }}
                  >
                    {category || "sans catégorie"}
                  </div>
              )
          }
          <div
            className="hover:bg-grey1 cursor-pointer"
            onClick={() => {setSelectedCategory(null)}}
          >
            tout
          </div>
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

