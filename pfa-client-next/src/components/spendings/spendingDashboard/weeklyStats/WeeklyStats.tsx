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
import useDashboard from "@components/spendings/services/useDashboard";
import { useForm } from "react-hook-form";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import useWeeklyStatsHelper from "@components/spendings/spendingDashboard/weeklyStats/helpers/useWeeklyStatsHelper";
import spendingsText from "@components/spendings/config/text";
import type { KeyboardEvent } from "react";

interface InitialCeiling {
  initialCeiling: string;
}

const WeeklyStats = () => {
  const { makeSlices, makeRange, isCurrentWeek} = useWeeklyStatsHelper();
  const { from } = useDatePickerWrapperStore();
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const { get: { data: weeklyStats }, mutation } = useWeeklyStats();
  const { get: { data: dashboard } } = useDashboard();
  const { register, handleSubmit, setFocus } = useForm<InitialCeiling>();
  const [initialCeiling, setInitialCeiling] = useState<number>(0);
  const [weeklySlices, setWeeklySlices] = useState<any>();
  const [averageWeeklyStatsAmount, setAverageWeeklyStatsAmount] = useState(0);
  const CEILING_WARN_LIMIT = 50;

  useEffect(() => {
    console.log("dashboard", dashboard);
    dashboard?.data ? setInitialCeiling(+dashboard?.data?.initialCeiling) : setInitialCeiling(0);
    console.log("initialCeiling", initialCeiling);
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
      console.log("zeroedOutWeeklyStats", zeroedOutWeeklyStats);
      setAverageWeeklyStatsAmount(
        accurateFixed(
          zeroedOutWeeklyStats
            .reduce((acc: number, curr: number) => acc + curr, 0)
          / zeroedOutWeeklyStats.length,
          1
        )
      );
    }
  }, [weeklyStats]);

  const onSubmit = (value: InitialCeiling) => {
    setIsInputVisible(false);
    mutation.mutate(value.initialCeiling);
  }

  useEffect(() => {
    isInputVisible && setFocus("initialCeiling", { shouldSelect: true });
  }, [setFocus, isInputVisible]);

  return (
    <div className="flex flex-col shrink-0 items-center w-[320px] h-[265px] border border-white bg-grey0 rounded gap-y-3 text-xs">
      <WidgetHeader
        title={spendingsText.dashboard.weeklyStats.headerTitle}
        periodType={WEEKLY}
      />
      <div className="flex uppercase select-none justify-start w-5/6 gap-x-1">
        <div className="text-xs border-b">
          {spendingsText.dashboard.weeklyStats.weeklyCeiling} :
        </div>

        <div
          className={`${!isInputVisible ? "visible" : "hidden"}`}
          onClick={() => {setIsInputVisible(true)}}
        >
          <div className="text-initialAmount font-bold hover:bg-initialAmountHover hover:cursor-pointer hover:rounded">
            {initialCeiling ?? 0} €
          </div>
        </div>

        <div className={`${isInputVisible ? "visible" : "hidden"}`}>
          <form
            onBlur={() => setIsInputVisible(false)}
            onSubmit={handleSubmit(onSubmit)}
          >
            {
              initialCeiling && (
                <input
                  className="w-10 outline-0 bg-transparent border-b border-b-black"
                  onKeyDown={(e: KeyboardEvent) => {e.key === "Escape" && setIsInputVisible(false)}}
                  defaultValue={initialCeiling}
                  {...register("initialCeiling")}
                />
              )
            }
          </form>
        </div>

      </div>

      <div className="flex flex-col justify-center w-5/6 text-sm gap-y-1 h-1/2">
        {
          weeklyStats?.data.length > 0 && weeklySlices?.length > 0 ?
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

      <div className="flex uppercase select-none justify-center w-full gap-x-1 text-xxs">
        <div>{spendingsText.dashboard.weeklyStats.weeklySpendings} : </div>
        <div className="font-bold">{Number(averageWeeklyStatsAmount).toFixed(1)} €</div>
      </div>
    </div>
  );
}

export default WeeklyStats;

