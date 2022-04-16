import Layout from "@src/components/shared/Layout";
import useGlobalStore from "@components/shared/globalStore";
import { useEffect } from "react";


const Categories = () => {
  const { setIsCalendarVisible } = useGlobalStore();
  useEffect(() => {
    setIsCalendarVisible(false);
  }, [setIsCalendarVisible]);

  return (
    <Layout>
      <div>Categories</div>
    </Layout>
  );
};

export default Categories;
