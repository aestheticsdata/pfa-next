"use client";

import { useEffect } from "react";
import useGlobalStore from "@components/shared/globalStore";
import CategoriesListcontainer from "@components/categories/CategoriesListcontainer";
import Layout from "@src/components/shared/Layout";
import Auth from "@app/components/Auth";

export default function Categories() {
  const { setIsCalendarVisible } = useGlobalStore();
  
  useEffect(() => {
    setIsCalendarVisible(false);
  }, [setIsCalendarVisible]);

  return (
    <Auth>
      <Layout>
        <CategoriesListcontainer />
      </Layout>
    </Auth>
  );
}

