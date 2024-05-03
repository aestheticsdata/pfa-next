import { useEffect } from "react";
import Statistics from "@components/statistics/Statistics";
import useGlobalStore from "@components/shared/globalStore";

const  StatisticsPage = () => {
  const { setIsCalendarVisible } = useGlobalStore();
  useEffect(() => {
    setIsCalendarVisible(false);
  }, [setIsCalendarVisible]);

  return (
    <Statistics />
  );
}

export default StatisticsPage;
