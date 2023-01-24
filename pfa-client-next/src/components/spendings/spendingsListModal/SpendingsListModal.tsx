import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import Period from "@components/spendings/spendingDashboard/common/Period";
import getCategoryComponent from "@components/common/Category";
import useSpendings from "@components/spendings/services/useSpendings";
import { MONTHLY } from "@components/spendings/spendingDashboard/common/widgetHeaderConstants";
import parseISO from "date-fns/parseISO";
import formatISO from "date-fns/formatISO";
import format from "date-fns/format";
import fr from "date-fns/locale/fr";

import type { Category } from "@src/interfaces/category";
import type { SpendingType } from "@components/spendings/types";


interface SpendingsListModalProps {
  handleClickOutside: any;
  periodType: string;
  categoryInfos: Category;
}

const SpendingsListModal = ({ handleClickOutside, periodType, categoryInfos }: SpendingsListModalProps) => {
  const { spendingsByWeek, spendingsByMonth } = useSpendings();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const ref = useRef(null);

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    // prevent scrolling on body when modal is open
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'auto';
    }
  }, []);

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
    const spendingsList = (spendings, i) =>
      <div
        key={i}
        className="text-sm mt-2 mb-2 px-3"
      >
        {
          periodType === MONTHLY ?
            <div
              className="cursor-pointer"
              onClick={() => {
                const dateISO = formatISO(new Date(spendings[0]), { representation: "date" });
                // TODO : update react-day-picker to v8, but
                // there is a lot of breaking changes
                // so location.replace for the time being
                window.location.replace(`/?currentDate=${dateISO}`);
              }}
            >
              <div className="uppercase font-medium bg-grey01 p-1 mb-1 text-grey3 hover:bg-spendingItemHover transition-colors ease-linear duration-200">
                {format(parseISO(spendings[0]), "EEEE dd MMMM", { locale: fr })}
              </div>
            </div>
            :
            <div className="uppercase font-medium bg-grey01 p-1 mb-1 text-grey3">
              {format(parseISO(spendings[0]), "EEEE dd MMMM", { locale: fr })}
            </div>
        }
        {spendings[1].map((spending, j) =>
          <div
            key={i+j}
            className="ml-2"
          >
            - {spending.label} : {spending.amount} €
          </div>
      )}
      </div>;

    if (periodType === MONTHLY) {
      return spendingsByMonth &&
        Object.entries(
          groupByDate(
            spendingsByMonth
              .filter((spending) => spending.category === categoryInfos.category)))
          .map((spendings, i) => spendingsList(spendings, i))
      }
    else {
      return spendingsByWeek &&
        Object.entries(
          groupByDate(
            spendingsByWeek
              .filter((spending) => spending.length > 0)
              .flat()
              ?.filter((spending) => spending.category === categoryInfos.category)))
          .map((spendings, i) => spendingsList(spendings, i))
    }
  }

  return (
    <div className="fixed flex justify-center items-center z-50 left-0 right-0 top-0 bottom-0 bg-invoiceFileModalBackground">
      <div
        ref={ref}
        className="absolute flex flex-col w-[700px] h-[520px] bg-grey0 rounded overflow-hidden"
      >
        <div className="flex flex-row justify-around border-b border-b-grey3 mx-3 h-12 items-center">
          <div className="w-1/3 border-r-2 border-r-grey1 border pr-2">
            {categoryInfos?.category && getCategoryComponent(categoryInfos)}
          </div>
          <div className="w-1/4 uppercase border-r-2 border-r-grey1 border pr-2 text-sm bold">total : </div>
          <Period periodType={periodType} />
        </div>

        <div className="flex flex-col mt-1 overflow-y-auto">
          {displaySpendingsList()}
        </div>

      </div>
    </div>
  );
}

export default SpendingsListModal;
