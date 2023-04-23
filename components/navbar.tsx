"use client";

import dynamic from "next/dynamic";
import NextLink from "next/link";
import { Divider, Logo } from "./shared/icons";
import UserDropdown from "./user-drop-down";

import { useSupabase } from "@/app/supabase-provider";
import { useEffect, useState } from "react";

const NavTabs = dynamic(() => import("./nav-tabs"), {
  ssr: false,
  loading: () => <div className="-mb-0.5 h-12 w-full" />,
}); // dynamic import to avoid react hydration mismatch error

export default function Nav() {
  const { supabase } = useSupabase();
  const [user, setUser] = useState(null);

  // const fetchUser = async () => {
  //   let {
  //     data: { user },
  //   } = await supabase.auth.getUser();

  //   let { data: profiles, error } = await supabase
  //     .from("profiles")
  //     .select(user?.id);

  //   if (error) {
  //     console.log("error", error);
  //   } else {
  //     console.log("profiles", profiles);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  return (
    <header className="sticky top-0 left-0 right-0 z-30 border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
        <nav
          id="main-nav"
          className="flex lg:items-center justify-between  lg:justify-start lg:space-x-10 h-16"
        >
          <div className="flex justify-start lg:w-0 lg:flex-1 items-center">
            <NextLink href="/">
              <Logo className="h-8 w-8 transition-all duration-75 active:scale-95" />
            </NextLink>
            <Divider className="h-8 w-8 text-gray-200 sm:ml-3" />
            <span className="mt-2 h-8 text-gray-400">Hello</span>
          </div>
          <div className="flex justify-end items-center">
            <div className="flex justify-center items-center mr-3">
              <span className=" bg-green-200 border border-indigo-300 rounded-lg px-2 py-1 text-xs capitalize">
                admin
              </span>
            </div>
            <UserDropdown />
          </div>
        </nav>
        {/* @ts-ignore */}
        <NavTabs />
      </div>
    </header>
  );
}
