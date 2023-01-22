import format from "date-fns/format";
import fr from "date-fns/locale/fr";
import getYear from "date-fns/getYear";
import { MONTHLY } from "@components/spendings/spendingDashboard/common/widgetHeaderConstants";
import useDatePickerStore from "@components/datePickerWrapper/store";


interface PeriodProps {
  periodType: string;
}

const Period = ({ periodType }: PeriodProps) => {
  const { to, from } = useDatePickerStore();

  return (
    <div className="uppercase text-sm">
      {periodType === MONTHLY && from && to ?
        <>
          {format(to, "MMMM", { locale: fr })} {getYear(to)}
        </>
        :
        <>
          {format(new Date(from as Date), "dd MMM yyyy", { locale: fr })} –{" "}
          {format(new Date(to as Date), "dd MMM yyyy", { locale: fr })}
        </>
      }
    </div>
  )
}
export default Period;
