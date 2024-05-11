import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import useRequestHelper from "@src/helpers/useRequestHelper";
import { QUERY_OPTIONS } from "@components/spendings/config/constants";

const useStatistics = (categories) => {
  const { privateRequest } = useRequestHelper();
  const [ statistics, setStatistics ] = useState<any>([]);
  console.log("categories", categories);
  const queryKey = ['statistics', ...categories?.map(category => category.ID) || ""];
  console.log("queryKey : ", queryKey);

  const getStatistics = () => {
    console.log("useStatistics::queryKey : ", queryKey);
    const categoryIds = categories.map(category => category.ID).join(',');
    return privateRequest(`/statistics?years=2022&categories=${categoryIds}`);
  };

  const { data, isLoading } = useQuery(
    queryKey,
    getStatistics,
    {
      retry: false,
      ...QUERY_OPTIONS,
      enabled: !!categories,
    });

  useEffect(() => {
    if (data?.data) {
      console.log("statistics data", data);
      setStatistics(data.data);
    }
  }, [data]);

  return {
    isLoading,
    statistics,
  }
}

export default useStatistics;
