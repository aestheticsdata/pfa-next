import { useQuery, useMutation, useQueryClient } from "react-query";
import useRequestHelper from "@helpers/useRequestHelper";
import { useUserStore } from "@auth/store/userStore";
import {
  QUERY_KEYS,
  QUERY_OPTIONS,
} from "@components/spendings/config/constants";


const useCategories = () => {
  const { privateRequest } = useRequestHelper();
  const userID = useUserStore((state) => state.user?.id);
  const queryClient = useQueryClient();

  const invalidation = async () => {
    await queryClient.invalidateQueries([QUERY_KEYS.CATEGORIES]);
    await queryClient.invalidateQueries([QUERY_KEYS.SPENDINGS_BY_WEEK]);
    await queryClient.invalidateQueries([QUERY_KEYS.CHARTS]);
  };

  const getCategoriesService = async () => {
    try {
      return privateRequest(`/categories?userID=${userID}`);
    } catch (e) {
      console.log("get categories error : ", e);
    }
  };
  const { data: categories } = useQuery(QUERY_KEYS.CATEGORIES, getCategoriesService, {
      retry: false,
      enabled: !!userID,
      ...QUERY_OPTIONS,
    });


  const updateCategoryService = async (category) => {
    try {
      return privateRequest(`/categories/${category.ID}`, {
        method: 'PUT',
        data: category,
      })
    } catch (e) {
      console.log(e);
    }
  };
  const updateCategory = useMutation(({ singleCategory: category }) => {
    console.log("WTF", category);
    return updateCategoryService(category);
  }, {
    onSuccess: async () => { await invalidation() },
    onError: ((e) => {console.log("error updating category", e)}),
  })

  const deleteCategoryService = async (categoryID) => {
    return privateRequest(`/categories/${categoryID}`, {
      method: 'DELETE',
    });
  };
  const deleteCategory = useMutation(({ categoryID }) => {
    return deleteCategoryService(categoryID);
  }, {
    onSuccess: async () => { await invalidation() },
    onError: ((e) => {console.log("error deleting category", e)}),
  })

  return {
    categories,
    deleteCategory,
    updateCategory,
  }
}

export default useCategories;

