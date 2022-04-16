import { useState } from "react";
import { Days, HoverRange } from "@components/datePickerWrapper/types";
import {
  getWeekDays,
  getWeekRange,
} from "@components/datePickerWrapper/helpers";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";

const useDatePickerState = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const [hoverRange, setHoverRange] = useState<HoverRange>(null);
  const [selectedDays, setSelectedDays] = useState<Days>([]);

  const { setFrom, setTo, setRange } = useDatePickerWrapperStore();

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleClickOutside = () => {
    setIsCalendarVisible(false);
  };

  const handleDayChange = (date: Date) => {
    // const dateISO = formatISO(date, { representation: "date" });
    // history.push("?currentDate=" + dateISO);
    const weekRange = getWeekRange(date);
    const dateRange = getWeekDays(weekRange.from, date);
    setFrom(weekRange.from);
    setTo(weekRange.to);
    setRange(dateRange);
    setSelectedDays(dateRange);

    handleClickOutside();
  };

  const handleDayEnter = (date: Date) => {
    setHoverRange(getWeekRange(date));
  };

  const handleDayLeave = () => {
    setHoverRange(null);
  };

  return {
    isCalendarVisible,
    hoverRange,
    selectedDays,
    setHoverRange,
    setSelectedDays,
    toggleCalendar,
    handleClickOutside,
    handleDayChange,
    handleDayEnter,
    handleDayLeave,
  };
};

export default useDatePickerState;
