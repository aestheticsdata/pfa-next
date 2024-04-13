import { KeyboardEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import getYear from "date-fns/getYear";
import format from "date-fns/format";
import fr from "date-fns/locale/fr";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";
import useDashboard from "@components/spendings/services/useDashboard";
import useInitialAmount from "@components/spendings/services/useInitialAmount";
import monthlyText from "@components/spendings/config/text";

interface InitialSalary {
  initialAmount: string;
}

const MonthlyBudget = () => {
  const { to } = useDatePickerWrapperStore();
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
  const { get : { data: dashboard }, mutation, remaining, monthlyTotal } = useDashboard();
  const { data: initialAmount } = useInitialAmount();
  const { register, handleSubmit, setFocus, reset } = useForm<InitialSalary>();

  useEffect(() => {
    if (dashboard && initialAmount) {
      reset();
    }
  }, [dashboard, initialAmount]);

  const onSubmit = (value: InitialSalary) => {
    setIsInputVisible(false);
    mutation.mutate({dashboardID: dashboard?.data?.ID, initialAmount: value.initialAmount});
  }

  useEffect(() => {
    isInputVisible && setFocus("initialAmount", { shouldSelect: true });
  }, [setFocus, isInputVisible]);

  return (
    to && (
      <div className="flex flex-col shrink-0 items-center bg-grey0 rounded w-[180px] h-[265px] gap-y-4">

        <div className="flex flex-col items-center text-xs font-bold border-b border-b-black w-5/6 py-2">
          <div className="uppercase">{format(to, "MMMM", { locale: fr })}</div>
          <div className="year">{getYear(to)}</div>
        </div>

        <div className="flex flex-col w-full items-center text-xs bg-initialAmountAlpha border-l-8 border-l-initialAmount pr-4 justify-around h-12">
          <div className="uppercase">{monthlyText.dashboard.monthlyBudget.initialAmount}</div>
          <div
            className={`${!isInputVisible ? "visible" : "hidden"}`}
            onClick={() => {setIsInputVisible(true)}}
          >
            <div className="text-initialAmount font-bold hover:bg-initialAmountHover hover:cursor-pointer hover:rounded hover:px-1">
              {dashboard?.data?.initialAmount ?? 0} €
            </div>
          </div>

          {
            dashboard && (
              <div className={`${isInputVisible ? "visible" : "hidden"}`}>
                <form
                  onBlur={() => setIsInputVisible(false)}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <input
                    className="w-10 outline-0 bg-transparent border-b border-b-black"
                    onKeyDown={(e: KeyboardEvent) => {e.key === "Escape" && setIsInputVisible(false)}}
                    defaultValue={dashboard?.data?.initialAmount ?? 0}
                    {...register("initialAmount")}
                  />
                </form>
              </div>
            )
          }
        </div>

        <div className={`flex flex-col w-full items-center text-xs border-l-8 border-l-remainingAmount pr-4 justify-around h-12 ${remaining >= 0 ? "bg-remainingAmountAlpha" : "bg-generalWarningBackground"}`}>
          <div className="uppercase text-xs">
            {monthlyText.dashboard.monthlyBudget.remaining}
          </div>
          <div className={`text-remainingAmount font-bold ${remaining < 0 && "text-generalWarning"}`}>
            {remaining} €
          </div>
        </div>

        <div className="flex flex-col w-full items-center text-xs bg-monthTotalAmountAlpha border-l-8 border-l-monthTotalAmount pr-4 justify-around h-12">
          <div className="uppercase text-xs">
            {monthlyText.dashboard.monthlyBudget.total}
          </div>
          <div className="text-monthTotalAmount font-bold">
            {monthlyTotal} €
          </div>
        </div>
      </div>
    )
  )
};

export default MonthlyBudget;
