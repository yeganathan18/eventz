import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { useMemo } from "react";

const TabsHelper = (router: NextRouter): { name: string; href: string }[] => {
  // get user role from local storage
  const userrole = localStorage.getItem("userrole");
  console.log(userrole);

  if (userrole === "admin") {
    return [
      { name: "All events", href: `/dashboard` },
      { name: "Verify users", href: `/verify` },
      { name: "Profile", href: `/profile` },
    ];
  } else if (userrole === "participant") {
    return [
      { name: "All events", href: `/dashboard` },
      { name: "Registered events", href: `/registered-events` },
      { name: "Profile", href: `/profile` },
    ];
  }
};

export default function NavTabs() {
  const router = useRouter();
  const tabs = useMemo(() => {
    if (!router.isReady) {
      return [];
    } else {
      return TabsHelper(router);
    }
  }, [router.query]);

  return (
    <div className="-mb-0.5 flex h-12 items-center justify-start space-x-4">
      {tabs?.map(({ name, href }) => (
        <Link
          key={href}
          href={href}
          className={`border-b-2 p-1 ${
            // hacky approach to getting the current tab – will replace with useSelectedLayoutSegments when upgrading to Next.js 13
            router.asPath.split("?")[0].split("/").slice(0, 3).join("/") ===
            href
              ? "border-black text-black"
              : "border-transparent text-gray-600 hover:text-black"
          }`}
        >
          <div className="rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
            <p className="text-sm md:text-base">{name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
