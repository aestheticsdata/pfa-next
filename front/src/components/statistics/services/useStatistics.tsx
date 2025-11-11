import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useRequestHelper from "@src/helpers/useRequestHelper";
import { QUERY_OPTIONS } from "@components/spendings/config/constants";

const generateYearRange = (startYear: number) => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let year: number = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years.join(',');
}

const useStatistics = (categories, yearSelectorWatcher) => {
  const { privateRequest } = useRequestHelper();
  const [ statistics, setStatistics ] = useState<any>([]);
  const queryKey = ['statistics', yearSelectorWatcher?.value ?? "", ...categories?.map(category => category.ID) || ""];

  const getStatistics = () => {
    const categoryIds = categories.map(category => category.ID).join(',');
    return privateRequest(`/statistics?years=${generateYearRange(yearSelectorWatcher.value)}&categories=${categoryIds}`);
  };

  const { data, isLoading } = useQuery(
    queryKey,
    getStatistics,
    {
      retry: true,
      ...QUERY_OPTIONS,
      enabled: !!categories && !!yearSelectorWatcher,
    });

  useEffect(() => {
    if (data?.data) {
      setStatistics(data.data);
    }
  }, [data]);

  return {
    isLoading,
    statistics,
  }
}

export default useStatistics;
