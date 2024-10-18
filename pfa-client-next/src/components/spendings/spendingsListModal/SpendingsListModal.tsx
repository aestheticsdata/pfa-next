import {
  useEffect,
  useRef, useState
} from "react";
import useOnClickOutside from "use-onclickoutside";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay, faChartLine, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import parseISO from "date-fns/parseISO";
import formatISO from "date-fns/formatISO";
import format from "date-fns/format";
import fr from "date-fns/locale/fr";
import Period from "@components/spendings/spendingDashboard/common/Period";
import CategoryComponent from "@components/common/Category";
import useSpendings from "@components/spendings/services/useSpendings";
import { MONTHLY } from "@components/spendings/spendingDashboard/common/widgetHeaderConstants";
import texts from "@components/spendings/config/text";

import type { CategoryProps } from "@src/interfaces/category";
import type { SpendingType } from "@components/spendings/types";

interface SpendingsListModalProps {
  handleClickOutside: any;
  periodType: string;
  categoryInfos: CategoryProps;
  total: number;
}

const SpendingsListModal = ({ handleClickOutside, periodType, categoryInfos, total }: SpendingsListModalProps) => {
  const { spendingsByWeek, spendingsByMonth } = useSpendings();
  const ref = useRef(null);
  const [searchTerm, setsearchTerm] = useState("");
  const { spendingsListModal: spendingsListModalTexts } = texts;

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
    const getAllPreviousEntries = (currentIndex: number): SpendingType[] => {
      if (periodType === MONTHLY && spendingsByMonth) {
        const filteredSpendings = spendingsByMonth.filter((spending) =>
          spending.category === categoryInfos.category && spending.label.includes(searchTerm)
        );
        const grouped = groupByDate(filteredSpendings);
        const entries = Object.entries(grouped);
        return entries
          .slice(0, currentIndex + 1)
          .reduce((acc: SpendingType[], [_, daySpendings]) => [...acc, ...daySpendings as SpendingType[]], []);
      } else if (spendingsByWeek) {
        const flattenedSpendings = spendingsByWeek
          .filter(spending => spending.length > 0)
          .flat()
          .filter(spending =>
            spending.category === categoryInfos.category && spending.label.includes(searchTerm)
          );
        const grouped = groupByDate(flattenedSpendings);
        const entries = Object.entries(grouped);
        return entries
          .slice(0, currentIndex + 1)
          .reduce((acc: SpendingType[], [_, daySpendings]) => [...acc, ...daySpendings as SpendingType[]], []);
      }
      return [];
    };

    const calculateDayTotal = (daySpendings: SpendingType[]): number => {
      return daySpendings.reduce((acc, spending) => acc + Number(spending.amount), 0);
    };

    const spendingsList = (spendings: [string, SpendingType[]], i: number) => {
      const dayTotal = calculateDayTotal(spendings[1]);
      const cumulativeTotal = getAllPreviousEntries(i)
        .reduce((acc, spending) => acc + Number(spending.amount), 0);

      return (
        <div
          key={i}
          className="text-sm mt-2 mb-2 px-3"
        >
          {periodType === MONTHLY ? (
            <div
              className="cursor-pointer"
              onClick={() => {
                const dateISO = formatISO(new Date(spendings[0]), { representation: "date" });
                window.location.replace(`/?currentDate=${dateISO}`);
              }}
            >
              <div className="flex justify-between font-medium bg-grey01 rounded p-1 mb-1 text-grey3 hover:bg-spendingItemHover transition-colors ease-linear duration-200">
                <div className="uppercase">
                  {format(parseISO(spendings[0]), "EEEE dd MMMM", { locale: fr })}
                </div>
                <div className="flex text-xxs space-x-3">

                  <div className="flex flex-col items-end pb-1 border border-grey1 rounded px-2">
                    <div className="flex items-center space-x-1">
                      <div className="underline">Total jour</div>
                      <FontAwesomeIcon icon={faCalendarDay}/>
                    </div>
                    <div>{dayTotal.toFixed(1)} €</div>
                  </div>

                  <div className="flex flex-col items-end pb-1 border border-grey1 rounded px-2">
                    <div className="flex items-center space-x-1">
                      <div className="underline">Total cumulé</div>
                      <FontAwesomeIcon icon={faChartLine}/>
                    </div>
                    <div className="flex w-full justify-end pr-1 rounded bg-gray-500 text-green-300">
                      {cumulativeTotal.toFixed(1)} €
                    </div>
                  </div>


                  <div className="flex flex-col items-end pb-1 border border-grey1 rounded px-2">
                    <div className="flex items-center space-x-1">
                      <div className="underline">Cumulé (% du mois)</div>
                      <FontAwesomeIcon icon={faChartSimple}/>
                    </div>
                    <div className="flex w-full justify-end pr-1 rounded bg-gray-500 text-fuchsia-100">
                      {((cumulativeTotal / total) * 100).toFixed(0)}%
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ) : (
            <div className="uppercase font-medium bg-grey01 p-1 mb-1 text-grey3">
              {format(parseISO(spendings[0]), "EEEE dd MMMM", {locale: fr})}
            </div>
          )}

          {spendings[1].map((spending: SpendingType, j: number) => (
            <div
              key={i + j}
              className="ml-2"
            >
              - {spending.label} : {Number(spending.amount).toFixed(2)} €
            </div>
          ))}
        </div>
      );
    };

    if (periodType === MONTHLY) {
      return spendingsByMonth &&
        Object.entries(
          groupByDate(
            spendingsByMonth
              .filter((spending) => {
                return (spending.category === categoryInfos.category) && (spending.label.includes(searchTerm))
              })))
          .map((spendings, i) => spendingsList(spendings, i))
      }
    else {
      return spendingsByWeek &&
        Object.entries(
          groupByDate(
            spendingsByWeek
              .filter((spending) => spending.length > 0)
              .flat()
              ?.filter((spending) => {
                return (spending.category === categoryInfos.category) && (spending.label.includes(searchTerm))
              })))
          .map((spendings, i) => spendingsList(spendings, i))
    }
  }

  return (
    <div className="fixed flex justify-center items-center z-50 left-0 right-0 top-0 bottom-0 bg-invoiceFileModalBackground">
      <div ref={ref} className="absolute flex flex-col space-y-2 w-[700px] h-[520px] bg-grey0 rounded">

        <div className="flex flex-row justify-around border-b border-b-grey3 mx-3 h-[50px] items-center">
          <div className="w-1/3 border-r-2 border-r-grey1 border pr-2">
            {categoryInfos?.category ?
              <CategoryComponent item={categoryInfos} />
              :
              spendingsListModalTexts.noCategoryLabel}
          </div>
          <div className="flex flex-row space-x-2 w-1/4 uppercase border-r-2 border-r-grey1 border pr-2 text-sm">
            <div>{spendingsListModalTexts.total} :</div>
            <div className="font-bold">{total} €</div>
          </div>
          <Period periodType={periodType} />
        </div>

        <div className="flex flex-row space-x-2 pb-2 border-b border-b-grey3 mx-3 h-[30px]">
          <div className="">{spendingsListModalTexts.filter} :</div>
          <input
            className=" py-2 bg-transparent focus:shadow-login border-formsGlobalColor border outline-none h-6 rounded p-1 text-sm w-2/5"
            value={searchTerm}
            onChange={e => setsearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col my-1 overflow-y-auto h-[420px]">
          {displaySpendingsList()}
        </div>

      </div>
    </div>
  );
}

export default SpendingsListModal;
