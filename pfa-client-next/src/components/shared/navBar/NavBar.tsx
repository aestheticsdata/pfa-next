import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthStore } from "@auth/store/authStore";
import DatePickerWrapper from "@components/datePickerWrapper/DatePickerWrapper";
import useGlobalStore from "@components/shared/globalStore";
import UserMenu from "@components/shared/navBar/userMenu/UserMenu";
import { ROUTES } from "@components/shared/config/constants";

const NavBar = () => {
  const token = useAuthStore((state) => state.token);
  const { isCalendarVisible } = useGlobalStore();
  const router = useRouter();

  const getActivePath = (route: string) => route === router.pathname ? "bg-spendingItemHover rounded text-blueNavy" : "";
  const getLinkItem = (route: any) => {
    return (
      <Link href={route.path} passHref>
        <a className={`outline-hidden p-1 ${getActivePath(route.path)} hover:cursor-pointer hover:bg-spendingItemHover hover:text-blueNavy hover:rounded`}>
          {route.label}
        </a>
      </Link>
    )
  }

  return (
    <div className={`flex md:flex-row fixed ${token ? "h-32" : "h-14"} md:h-14 w-screen items-center justify-start bg-blueNavy text-white z-50`}>
      {typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches &&
        <div className="mx-4">
          <img src="/assets/money-svgrepo-com.svg" alt="logo" width="40" height="40"/>
        </div>
      }
      {token ? (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-5 items-center justify-between font-ubuntu w-full">
          <div className="flex space-x-4">
            {typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches && getLinkItem(ROUTES.spendings)}
            {typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches && getLinkItem(ROUTES.categories)}
            {isCalendarVisible && <DatePickerWrapper />}
          </div>
          <div className="flex">
            <UserMenu />
          </div>
        </div>
      ) : (
        <div className="flex space-x-5 font-ubuntu">
            {getLinkItem(ROUTES.login)}
            {getLinkItem(ROUTES.signup)}
            {getLinkItem(ROUTES.about)}
        </div>
      )}
    </div>
  );
};

export default NavBar;
