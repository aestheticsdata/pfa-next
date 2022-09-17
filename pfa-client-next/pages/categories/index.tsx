import { useEffect } from "react";
import useGlobalStore from "@components/shared/globalStore";
import CategoriesListcontainer from "@components/categories/CategoriesListcontainer";


const Categories = () => {
  const { setIsCalendarVisible } = useGlobalStore();
  useEffect(() => {
    setIsCalendarVisible(false);
  }, [setIsCalendarVisible]);

 return <CategoriesListcontainer />;
};

export default Categories;
