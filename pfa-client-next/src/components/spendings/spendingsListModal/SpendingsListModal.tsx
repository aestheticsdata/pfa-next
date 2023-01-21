import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import useDatePickerStore from "@components/datePickerWrapper/store";
import Period from "@components/spendings/spendingDashboard/common/Period";
import getCategoryComponent from "@components/common/Category";
import useSpendings from "@components/spendings/services/useSpendings";
import { MONTHLY } from "@components/spendings/spendingDashboard/common/widgetHeaderConstants";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import fr from "date-fns/locale/fr";

import type { Category } from "@src/interfaces/category";
import { Spending } from "@components/spendings/interfaces/spendingDashboardTypes";
import { SpendingType } from "@components/spendings/types";


interface SpendingsListModalProps {
  handleClickOutside: any;
  periodType: string;
  categoryInfos: Category;
}

const SpendingsListModal = ({ handleClickOutside, periodType, categoryInfos }: SpendingsListModalProps) => {
  const { to, from } = useDatePickerStore();
  const { spendingsByWeek, spendingsByMonth } = useSpendings();
  const ref = useRef(null);

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    // prevent scrolling on body when modal is open
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    }
  }, []);

  useEffect(() => {
    console.log("period type: ", periodType)
    spendingsByWeek && console.log("spendings by week", Object.entries(groupByDate(spendingsByWeek.filter((spending) => spending.length > 0).flat()?.filter((spending) => spending.category === categoryInfos.category))));
    console.log("spendings by week length", spendingsByWeek?.length);
    console.log("spendings by month", spendingsByMonth);
  }, [spendingsByWeek, spendingsByMonth]);

  const groupByDate = (spendings: SpendingType[]) => {
    return spendings?.reduce((acc, curr) => {
      if (!acc[curr.date]) {
        acc[curr.date] = []
      }
      acc[curr.date].push(curr);
      return acc;
    }, {})
  }

  const displaySpendingsList = () => {
    if (periodType === MONTHLY) {
      return spendingsByMonth
        ?.filter((spending) => spending.category === categoryInfos.category)
        .map((spending, i) =>
          <div key={i}>
            {spending.label} : {spending.amount} €
          </div>)}
    else {
      return spendingsByWeek &&
      Object.entries(
        groupByDate(
          spendingsByWeek
            .filter((spending) => spending.length > 0)
            .flat()
            ?.filter((spending) => spending.category === categoryInfos.category)))
        .map((spendings, i) =>
          <div key={i}>
            {format(parseISO(spendings[0]), "EEEE dd MMMM", { locale: fr })} : {spendings[1].map((spending, j) =>
              <div key={i+j}>{spending.label}: {spending.amount} €</div>
            )}
          </div>)
    }
  }

  return (
    <div className="fixed flex justify-center items-center z-50 left-0 right-0 top-0 bottom-0 bg-invoiceFileModalBackground">
      <div
        ref={ref}
        className="absolute flex flex-col w-[700px] h-[520px] bg-grey0 rounded overflow-hidden"
      >
        <div className="flex flex-row justify-around border-b border-b-grey3 mx-3 h-10 items-center">
          <div className="w-1/3">
            {categoryInfos?.category && getCategoryComponent(categoryInfos)}
          </div>
          <div className="w-1/4">total</div>
          <Period periodType={periodType} />
        </div>

        <div className="flex flex-col mx-3">
          {displaySpendingsList()}
        </div>

      </div>
    </div>
  );
}

export default SpendingsListModal;
