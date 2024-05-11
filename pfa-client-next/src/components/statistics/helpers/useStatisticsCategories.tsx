import { useEffect, useState } from 'react';

const useStatisticsCategories = (categories) => {
  const [statisticsCategories, setStatisticsCategories] = useState<any>([]);

  useEffect(() => {
    if (categories && categories.data) {
      const categoriesTmp = [...categories.data];

      categoriesTmp.forEach((category) => {
        category.label = category.name;
        category.value = category.ID;
      });

      categoriesTmp.sort((a, b) => a.label.localeCompare(b.label));

      setStatisticsCategories(categoriesTmp);
    }
  }, [categories]);

  return statisticsCategories;
};

export default useStatisticsCategories;
