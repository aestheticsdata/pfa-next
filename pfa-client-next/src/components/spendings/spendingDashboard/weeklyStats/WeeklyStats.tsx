import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltDown,
  faLongArrowAltUp,
} from "@fortawesome/free-solid-svg-icons";
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import format from 'date-fns/format';
import getDay from "date-fns/getDay";
import getDaysInMonth from "date-fns/getDaysInMonth";
import getDate from "date-fns/getDate";
import spinner from "@src/assets/Wedges-3s-200px.svg";
import Image from 'next/image';
import WidgetHeader from "@components/spendings/spendingDashboard/common/WidgetHeader";
import { WEEKLY } from "@components/spendings/spendingDashboard/common/widgetHeaderConstants";
import useWeeklyStats from "@components/spendings/services/useWeeklyStats";
import { accurateFixed } from "@helpers/mathExprEval";
import { UseQueryResult } from "react-query";
import useDashboard from "@components/spendings/services/useDashboard";
import { useForm } from "react-hook-form";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import useWeeklyStatsHelper from "@components/spendings/spendingDashboard/weeklyStats/helpers/useWeeklyStatsHelper";
import type { KeyboardEvent } from "react";


const WeeklyStats = () => {
  const { makeSlices, makeRange, isCurrentWeek} = useWeeklyStatsHelper();
  const { from } = useDatePickerWrapperStore();
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const { data: weeklyStats } = useWeeklyStats();
  const { data: dashboard } = useDashboard();
  const { register, handleSubmit, setFocus } = useForm();
  const [initialCeiling, setInitialCeiling] = useState<number | null>(null);
  const [weeklySlices, setWeeklySlices] = useState<any>();
  const [averageWeeklyStatsAmount, setAverageWeeklyStatsAmount] = useState(0);
  const CEILING_WARN_LIMIT = 50;

  useEffect(() => {
    dashboard && setInitialCeiling(+dashboard.data.initialCeiling);
  }, [dashboard]);

  useEffect(() => {
    from && setWeeklySlices(makeSlices(makeRange(from)));
  }, [from]);

  useEffect(() => {
    console.log("weeklyStats", weeklyStats);
    if (weeklyStats?.data.length > 0) {
      console.log("weeklyStats", weeklyStats);
      // filter(Boolean) removes 0 from array
      const zeroedOutWeeklyStats = weeklyStats!.data.filter(Boolean);
      setAverageWeeklyStatsAmount(
        accurateFixed(
          zeroedOutWeeklyStats
            .reduce((acc, curr) => acc + curr, 0)
          / zeroedOutWeeklyStats.length,
          1
        )
      );
    }
  }, [weeklyStats]);

  const onSubmit = () => {
    setIsInputVisible(false);
    console.log("onsubmit");
  }

  useEffect(() => {
    isInputVisible && setFocus("initialCeiling", { shouldSelect: true});
  }, [setFocus, isInputVisible]);

  return (
    <div className="flex flex-col items-center w-[320px] h-[265px] border border-white bg-grey0 rounded uppercase gap-y-3 text-xs">
      <WidgetHeader
        title="totaux par période"
        periodType={WEEKLY}
      />
      <div className="flex uppercase select-none justify-start w-5/6 gap-x-2">
        <div className="text-xs border-b">
          PLAFOND HEBDOMADAIRE :
        </div>

        <div
          className={`${!isInputVisible ? "visible" : "hidden"}`}
          onClick={() => {setIsInputVisible(true)}}
        >
          <div className="text-initialAmount font-bold hover:bg-initialAmountHover hover:cursor-pointer">{initialCeiling ?? 0} €</div>
        </div>

        {
          initialCeiling && (
            <div className={`${isInputVisible ? "visible" : "hidden"}`}>
              <form
                onBlur={() => setIsInputVisible(false)}
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  className="w-10 outline-0 bg-transparent border-b border-b-black"
                  onKeyDown={(e: KeyboardEvent) => {e.key === "Escape" && setIsInputVisible(false)}}
                  defaultValue={initialCeiling}
                  {...register("initialCeiling")}
                />
              </form>
            </div>
          )
        }
      </div>

      <div className="flex flex-col w-5/6 text-sm">
        {
          weeklyStats?.data.length > 0 && initialCeiling ?
            weeklyStats!.data.map((weekSliceValue: number, i: number) => {
              const ceilingDiff = weekSliceValue - initialCeiling;
              return (
                <div
                  key={i}
                  className={`flex justify-between items-center ${isCurrentWeek(weeklySlices[i], from) ? "font-bold" : ""}`}
                >
                  {isCurrentWeek(weeklySlices[i], from)}
                  <div className="flex w-4/12 gap-x-2">
                    <div>{weeklySlices[i]}</div>
                    <div>:</div>
                  </div>
                  <div className="flex w-4/12 justify-start">
                    {Number(weekSliceValue).toFixed(2)} €
                  </div>
                  <div className="flex justify-start w-4/12 text-xxs gap-x-1">
                    <div>
                    {
                      ceilingDiff > 0 ?
                        <FontAwesomeIcon
                          icon={faLongArrowAltUp}
                          className={`${ceilingDiff > CEILING_WARN_LIMIT ? "text-ceilingExcess border-b-ceilingExcess" : "text-ceilingWarn border-b-ceilingWarn"} border-b`}
                        />
                        :
                        <FontAwesomeIcon
                          icon={faLongArrowAltDown}
                          className="text-ceilingOK border-t border-t-ceilingOK"
                        />
                    }
                    </div>
                    <div>
                      {
                        ceilingDiff > 0 ?
                          <div className={`${ceilingDiff > CEILING_WARN_LIMIT ? "text-ceilingExcess": "text-ceilingWarn"}`}>
                            +
                            {Number(ceilingDiff).toFixed(2)} €
                          </div>
                          :
                          <div className="text-ceilingOK">
                            {Number(Math.abs(ceilingDiff)).toFixed(2)} €
                          </div>
                      }
                    </div>
                  </div>
                </div>
              )
            })
            :
            <Image
              alt="spinner"
              src={spinner}
              width={60}
              height={60}
            />
        }
      </div>

      <div className="text-xxs">
        dépenses moyennes hebdomadaires :
        <span className="font-bold">
            {Number(averageWeeklyStatsAmount).toFixed(1)} €
          </span>
      </div>
    </div>
  );
}

export default WeeklyStats;

