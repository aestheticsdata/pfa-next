import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex h-14 w-screen items-center justify-start bg-blueNavy text-white">
      <div className="mx-4 mt-2">
        <Image src="/money-svgrepo-com.svg" alt="logo" width="40" height="40" />
      </div>
      <div className="flex space-x-5 font-ubuntu">
        <Link href="/login">Login</Link>
        <Link href="/signup">SignUp</Link>
        <Link href="/about">About</Link>
      </div>
    </div>
  );
};

export default NavBar;
