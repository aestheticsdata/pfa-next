import { useState } from "react";
import { useRouter } from "next/router";
import formatISO from "date-fns/formatISO";
import {
  getWeekDays,
  getWeekRange,
} from "@components/datePickerWrapper/helpers";
import useDatePickerWrapperStore from "@components/datePickerWrapper/store";

import type { Days, HoverRange } from "@components/datePickerWrapper/types";


const useDatePickerState = () => {
  const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
  const [hoverRange, setHoverRange] = useState<HoverRange>(null);
  const [selectedDays, setSelectedDays] = useState<Days>([]);

  const router = useRouter()

  const { setFrom, setTo, setRange } = useDatePickerWrapperStore();

  const toggleCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
  };

  const handleClickOutside = () => {
    setIsCalendarVisible(false);
  };

  const handleDayChange = (date: Date) => {
    const dateISO = formatISO(date, { representation: "date" });
    router.push({
      query: { currentDate: dateISO },
    });

    const weekRange = getWeekRange(date);
    const dateRange: Date[] = getWeekDays(weekRange.from, date);

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
