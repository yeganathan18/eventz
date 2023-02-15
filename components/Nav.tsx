import dynamic from "next/dynamic";
import NextLink from "next/link";
import { Divider, Logo } from "./shared/icons";
import UserDropdown from "./UserDropDown";

const NavTabs = dynamic(() => import("./NavTabs"), {
  ssr: false,
  loading: () => <div className="-mb-0.5 h-12 w-full" />,
}); // dynamic import to avoid react hydration mismatch error

export default function Nav(props) {
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
            <span className="mt-2 h-8 text-gray-400">{props?.username}</span>
          </div>
          <div className="flex justify-end items-center">
            <div className="flex justify-center items-center mr-3">
              <span className=" bg-green-200 border border-indigo-300 rounded-lg px-2 py-1 text-xs capitalize">
                {props?.userrole}
              </span>
            </div>
            <UserDropdown />
          </div>
        </nav>
        {/* @ts-ignore */}
        <NavTabs userRole={props?.userrole} />
      </div>
    </header>
  );
}
