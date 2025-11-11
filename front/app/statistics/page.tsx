"use client";

import { useEffect } from "react";
import Statistics from "@components/statistics/Statistics";
import useGlobalStore from "@components/shared/globalStore";
import Layout from "@src/components/shared/Layout";
import Auth from "@app/components/Auth";

export default function StatisticsPage() {
  const { setIsCalendarVisible } = useGlobalStore();
  
  useEffect(() => {
    setIsCalendarVisible(false);
  }, [setIsCalendarVisible]);

  return (
    <Auth>
      <Layout>
        <Statistics />
      </Layout>
    </Auth>
  );
}

