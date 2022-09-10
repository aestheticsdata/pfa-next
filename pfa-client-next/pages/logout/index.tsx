import { useUserStore } from "@auth/store/userStore";
import { useAuthStore } from "@auth/store/authStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout = () => {
  const userStore = useUserStore();
  const authStore = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    authStore.setToken(null);
    userStore.setUser(null);
    router.push("/login");
  }, []);

  return <></>;
};

Logout.auth = false;

export default Logout;
