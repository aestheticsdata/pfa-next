import { useEffect, useRef } from "react";
import queryString from "query-string";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import useOnClickOutside from "use-onclickoutside";
import fr from "date-fns/locale/fr";
import format from "date-fns/format";
import { WEEKDAYS_LONG, WEEKDAYS_SHORT, MONTHS } from "./locale-fr";
import useDatePickerState from "@components/datePickerWrapper/helpers/useDatePickerState";

const DatePickerWrapper = () => {
  const {
    isCalendarVisible,
    hoverRange,
    selectedDays,
    toggleCalendar,
    handleClickOutside,
    handleDayChange,
    handleDayEnter,
    handleDayLeave,
  } = useDatePickerState();

  const ref = useRef(null);

  const daysAreSelected = selectedDays.length > 0;

  const modifiers: any = {
    hoverRange,
    selectedRange: daysAreSelected && {
      from: selectedDays[0],
      to: selectedDays[selectedDays.length - 1],
    },
    hoverRangeStart: hoverRange && hoverRange.from,
    hoverRangeEnd: hoverRange && hoverRange.to,
    selectedRangeStart: daysAreSelected && selectedDays[0],
    selectedRangeEnd: daysAreSelected && selectedDays[selectedDays.length - 1],
  };

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    const currentDate = queryString.parse(window.location.search).currentDate;
    currentDate
      ? handleDayChange(new Date(currentDate as string))
      : handleDayChange(new Date());
  }, []);

  return (
    <div ref={ref} className="bg-grey3 relative m-1">
      <div
        className="border border-datePickerWrapper text-datePickerWrapper bg-datePickerWrapperBackground rounded px-2 select-none cursor-pointer"
        onClick={toggleCalendar}
      >
        {selectedDays.length > 0 ? (
          <div>
            {format(selectedDays[0], "dd MMM yyyy", { locale: fr })} –{" "}
            {format(selectedDays[selectedDays.length - 1], "dd MMM yyyy", {
              locale: fr,
            })}
          </div>
        ) : (
          <div>dates</div>
        )}
      </div>
      <div className="date-picker absolute bg-grey3">
        {isCalendarVisible ? (
          <DayPicker
            initialMonth={selectedDays[0]}
            locale="fr"
            months={MONTHS}
            weekdaysLong={WEEKDAYS_LONG}
            weekdaysShort={WEEKDAYS_SHORT}
            selectedDays={selectedDays}
            showWeekNumbers={false}
            showOutsideDays={false}
            modifiers={modifiers}
            onDayClick={handleDayChange}
            onDayMouseEnter={handleDayEnter}
            onDayMouseLeave={handleDayLeave}
            onWeekClick={() => {}}
          />
        ) : null}
      </div>
    </div>
  );
};

export default DatePickerWrapper;
