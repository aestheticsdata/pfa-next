import type { NextPage } from "next";
import { useQuery } from "react-query";
import { useUserStore } from "@auth/store/userStore";
import Layout from "@src/components/shared/Layout";
import Spendings from "@components/spendings/Spendings";
import useGlobalStore from "@components/shared/globalStore";
import { useEffect } from "react";

const Home = () => {
  const user = useUserStore((state) => state.user);
  const { setIsCalendarVisible } = useGlobalStore();
  useEffect(() => {
    setIsCalendarVisible(true);
  }, [setIsCalendarVisible]);
  // const { data } = useQuery("dashboard", () => getDashboard(user!.id, start));

  return (
    <Layout>
      <Spendings />
    </Layout>
  );
};

Home.auth = true;

export default Home;
