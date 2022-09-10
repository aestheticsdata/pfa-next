import { useUserStore } from "@auth/store/userStore";
import { useRouter } from "next/router";
import {
  faSignOutAlt,
  faKey,
} from '@fortawesome/free-solid-svg-icons';

import Dropdown from '@components/common/dropdown/Dropdown';
import UserMenuContent from './UserMenuContent';


const UserMenu = () => {
  const user = useUserStore((state) => state.user!);
  const router = useRouter();

  const listItems = [
    {
      id: "changepassword",
      label: "modifier le mot de passe",
      icon: faKey,
      callback: () => router.push("/changepassword"),
    },
    {
      id: "logout",
      label: "logout",
      icon: faSignOutAlt,
      callback: () => router.push("/logout"),
    },
  ];

  return (
    <div className="mr-8 cursor-pointer bg-transparent">
      <Dropdown>
        <span className="whitespace-nowrap block overflow-hidden text-ellipsis">{user.email}</span>
        <UserMenuContent
          listItems={listItems}
        />
      </Dropdown>
    </div>
  )
};

export default UserMenu;

