import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@auth/store/authStore";
import DatePickerWrapper from "@components/datePickerWrapper/DatePickerWrapper";
import useGlobalStore from "@components/shared/globalStore";
import sharedText from "@components//shared/config/text";

const NavBar = () => {
  const token = useAuthStore((state) => state.token);
  const { isCalendarVisible } = useGlobalStore();

  return (
    <div className="flex fixed h-14 w-screen items-center justify-start bg-blueNavy text-white z-50">
      <div className="mx-4 mt-2">
        <Image src="/money-svgrepo-com.svg" alt="logo" width="40" height="40" />
      </div>
      {token ? (
        <div className="flex space-x-5 font-ubuntu">
          <Link href="/" passHref><div className="outline-hidden p-1 hover:cursor-pointer hover:bg-spendingItemHover hover:text-blueNavy hover:rounded">{sharedText.navBar.spendings}</div></Link>
          <Link href="/categories" passHref><div className="outline-hidden p-1 hover:cursor-pointer hover:bg-spendingItemHover hover:text-blueNavy hover:rounded">{sharedText.navBar.categories}</div></Link>
          {isCalendarVisible && <DatePickerWrapper />}
        </div>
      ) : (
        <div className="flex space-x-5 font-ubuntu">
          <Link href="/login">{sharedText.navBar.login}</Link>
          <Link href="/signup">{sharedText.navBar.signup}</Link>
          <Link href="/about">{sharedText.navBar.about}</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
