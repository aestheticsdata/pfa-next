import useRequestHelper from "@helpers/useRequestHelper";
import { useUserStore } from "@auth/store/userStore";
import { useQuery } from "react-query";
import { QUERY_OPTIONS } from "@components/spendings/config/constants";


const useCategories = () => {
  const { privateRequest } = useRequestHelper();
  const userID = useUserStore((state) => state.user!.id);

  const getCategories = async () => {
    try {
      return privateRequest(`/categories?userID=${userID}`);
    } catch (e) {
      console.log("get categories error : ", e);
    }
  };

  return useQuery("categories", getCategories, {
    retry: false,
    ...QUERY_OPTIONS,
  });
}

export default useCategories;
