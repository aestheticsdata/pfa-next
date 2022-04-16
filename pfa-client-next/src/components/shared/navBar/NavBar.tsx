import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@auth/store/authStore";
import DatePickerWrapper from "@components/datePickerWrapper/DatePickerWrapper";
import useGlobalStore from "@components/shared/globalStore";

const NavBar = () => {
  const token = useAuthStore((state) => state.token);
  const { isCalendarVisible } = useGlobalStore();

  return (
    <div className="flex h-14 w-screen items-center justify-start bg-blueNavy text-white z-50">
      <div className="mx-4 mt-2">
        <Image src="/money-svgrepo-com.svg" alt="logo" width="40" height="40" />
      </div>
      {token ? (
        <div className="flex space-x-5 font-ubuntu">
          <Link href="/">Spendings</Link>
          <Link href="/categories">Categories</Link>
          {isCalendarVisible && <DatePickerWrapper />}
        </div>
      ) : (
        <div className="flex space-x-5 font-ubuntu">
          <Link href="/login">Login</Link>
          <Link href="/signup">SignUp</Link>
          <Link href="/about">About</Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
