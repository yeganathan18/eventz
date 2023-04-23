import { useState } from "react";
import { Logout, User } from "@/components/shared/icons";
import Popover from "@/components/shared/popover";
import IconMenu from "./shared/icon-menu";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
  const user = useUser();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-1 sm:w-56">
            <button
              className="relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={async () => {
                router.push("/profile");
              }}
            >
              <IconMenu text="Profile" icon={<User className="h-4 w-4" />} />
            </button>
            <button
              className="relative w-full rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100"
              onClick={async () => {
                supabaseClient.auth.signOut().then(() => {
                  router.push("/");
                });
              }}
            >
              <IconMenu text="Logout" icon={<Logout className="h-4 w-4" />} />
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-10 sm:w-10"
        >
          {user && (
            <Image
              alt={user?.email || "Avatar for logged in user"}
              src={`https://avatars.dicebear.com/api/micah/${user?.email}.svg`}
              width={40}
              height={40}
            />
          )}
        </button>
      </Popover>
    </div>
  );
}
