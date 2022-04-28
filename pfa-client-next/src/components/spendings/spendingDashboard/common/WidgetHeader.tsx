import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import { MONTHLY } from "@components/spendings/spendingDashboard/common/widgetHeaderConstants";
import useDatePickerStore from "@components/datePickerWrapper/store";
import format from "date-fns/format";
import fr from "date-fns/locale/fr";


interface WidgetHeaderProps {
  title: string;
  periodType: string;
  center?: boolean;
}

const WidgetHeader = ({ title, periodType, center = false }: WidgetHeaderProps) => {
  const { to, from } = useDatePickerStore();

  return (
    <div className={`flex flex-col w-5/6 border-b border-b-grey2 ${center ? "items-center" : "items-start"} text-xs py-2`}>
      <div className="font-bold uppercase">
        {title}
      </div>
      <div className="uppercase">
        {
          periodType === MONTHLY && from && to ?
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
    </div>
  );
};

export default WidgetHeader;

