import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useAuthStore } from "@auth/store/authStore";
import { useUserStore } from "@auth/store/userStore";

const Logout = () => {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  const router = useRouter();
  const [isRedirected, setIsRedirected] = useState(false);

  const queryClient = useQueryClient();
  queryClient.clear();

  useEffect(() => {
    authStore.setToken(null);
    userStore.setUser(null);
    if (!isRedirected) { // https://stackoverflow.com/a/73344411/5671836
      router.push("/login");
      setIsRedirected(true);
    }
  }, []);

  return <></>;
};

Logout.auth = false;

export default Logout;
