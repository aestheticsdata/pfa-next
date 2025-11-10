"use client";

import { useEffect } from "react";
import { useQuery } from "react-query";
import { useUserStore } from "@auth/store/userStore";
import Layout from "@src/components/shared/Layout";
import Spendings from "@components/spendings/Spendings";
import useGlobalStore from "@components/shared/globalStore";
import Auth from "@app/components/Auth";

export default function Home() {
  const user = useUserStore((state) => state.user);
  const { setIsCalendarVisible } = useGlobalStore();
  
  useEffect(() => {
    setIsCalendarVisible(true);
  }, [setIsCalendarVisible]);

  return (
    <Auth>
      <Layout>
        <Spendings />
      </Layout>
    </Auth>
  );
}

