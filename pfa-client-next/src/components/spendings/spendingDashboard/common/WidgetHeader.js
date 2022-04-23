import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import { MONTHLY } from "@components/spendings/spendingDashboard/common/widgetHeaderConstants";
import useDatePickerStore from "@components/datePickerWrapper/store";
import format from "date-fns/format";
import fr from "date-fns/locale/fr";


const WidgetHeader = ({ title, periodType }) => {
  const { to, from } = useDatePickerStore();

  return (
    <div className="flex flex-col w-5/6 border-b border-b-grey2 items-start text-xs py-2">
      <div className="font-ubuntu font-bold">
        {title}
      </div>
      <div className="uppercase">
        {
          periodType === MONTHLY && from && to ?
            <>
              <span className="month">{getMonth(to)}</span>
              <span className="year">{getYear(to)}</span>
            </>
            :
            <>
              {format(new Date(from), "dd MMM yyyy", { locale: fr })} –{" "}
              {format(new Date(to), "dd MMM yyyy", { locale: fr })}
            </>

        }
      </div>
    </div>
  );
};

export default WidgetHeader;

