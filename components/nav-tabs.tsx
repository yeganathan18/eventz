import Link from "next/link";
import { usePathname } from "next/navigation";
import { NextRouter } from "next/router";
import { useMemo } from "react";
import cx from "classnames";

// if (userrole === "admin") {
//   return [
//     { name: "All events", href: `/dashboard` },
//     { name: "Verify users", href: `/verify` },
//     { name: "Profile", href: `/profile` },
//   ];
// }

// return [
//   { name: "All events", href: `/dashboard` },
//   { name: "Registered events", href: `/registered-events` },
//   { name: "Profile", href: `/profile` },
// ];

const adminNav = [
  { name: "Home", href: `/dashboard` },
  { name: "Verification", href: `/verification` },
  { name: "Profile", href: `/profile` },
];

export default function NavTabs() {
  const pathname = usePathname();

  return (
    <div className="-mb-0.5 flex h-12 items-center justify-start space-x-4">
      {adminNav.map(({ name, href }) => (
        <Link
          key={href}
          href={href}
          className={cx(
            "border-b-2 p-1",
            pathname === href
              ? "border-black text-black"
              : "border-transparent text-gray-600 hover:text-black"
          )}
        >
          <div className="rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
            <p className="text-sm">{name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
