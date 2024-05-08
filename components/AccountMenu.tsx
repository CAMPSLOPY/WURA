import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { useSession} from 'next-auth/react';
import React from "react";

interface AccountMenuProps{
    visible: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
visible

}) => {

    const {data} = useSession();
    if (!visible){
        return null;
    }
  return (
    <div className="border-gray-800 flex bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2">
      <div className="flex flex-col gap-3">
<div className="px-3 group/item flex flex-row gap-3 items-center w-full">
<img src="./images/user.png" alt="" className="w-8 rounded-md" />
<p className="text-white text-sm group-hover/item:underline">{data?.user?.name}</p>
</div>
<hr className="bg-sky-600 border-0 h-px my-4" />
<div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover;underline">
Sign Out of Wura App
</div>
      </div>
    </div>
  )
}

export default AccountMenu;
