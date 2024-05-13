import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import useRequestHelper from "@src/helpers/useRequestHelper";
import { QUERY_OPTIONS } from "@components/spendings/config/constants";

const useStatistics = (categories, yearSelectorWatcher) => {
  const { privateRequest } = useRequestHelper();
  const [ statistics, setStatistics ] = useState<any>([]);
  const queryKey = ['statistics', yearSelectorWatcher.value, ...categories?.map(category => category.ID) || ""];

  const getStatistics = () => {
    const categoryIds = categories.map(category => category.ID).join(',');
    return privateRequest(`/statistics?years=${yearSelectorWatcher.value}&categories=${categoryIds}`);
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
