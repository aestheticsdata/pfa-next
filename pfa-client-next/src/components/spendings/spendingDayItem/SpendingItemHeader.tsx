import format from "date-fns/format";
import fr from "date-fns/locale/fr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import spendingsText from "@components/spendings/config/text";

interface SpendingItemHeaderProps {
  date: Date;
  recurringType: boolean;
  isToday: boolean;
  addSpending: () => void;
  addSpendingEnabled: boolean;
}

const SpendingItemHeader = ({ date, recurringType, isToday, addSpending, addSpendingEnabled }: SpendingItemHeaderProps) => {
  return (
    <div className="header flex h-10 justify-around items-center">
      {(date !== null || recurringType) && (
        !recurringType
          ?
          <div className={`flex w-full font-poppins uppercase ${isToday ? "bg-datePickerWrapper" : "bg-grey1"} text-black justify-center font-bold text-sm items-center border border-grey2 rounded w-5/6`}>
            <div>{format(date, "dd MMM yyyy", { locale: fr })}</div>
          </div>
          :
          <div className="flex w-full text-grey2 uppercase justify-center items-center font-bold text-sm border border-grey2 rounded w-5/6">
            {spendingsText.dayItem.recurringTitle}
          </div>
      )
      }
      <div className={`select-none cursor-pointer text-grey1 text-xl hover:text-addSpendingHover ${!addSpendingEnabled && "cursor-not-allowed hover:text-grey1"}`} onClick={addSpending}>
        <FontAwesomeIcon icon={faPlusSquare} />
      </div>
    </div>
  )
};

export default SpendingItemHeader;
