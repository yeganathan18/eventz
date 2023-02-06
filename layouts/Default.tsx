import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Divider, Logo } from "@/components/shared/icons";
import UserDropdown from "@/components/UserDropDown";
import Nav from "@/components/Nav";

export default function AppLayout({
  children,
  bgWhite,
}: {
  children: ReactNode;
  bgWhite?: boolean;
}) {
  const router = useRouter();
  const { slug, key } = router.query as {
    slug?: string;
    key?: string;
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className={`min-h-screen w-full ${bgWhite ? "bg-white" : "bg-gray-50"}`}
      >
        <Nav />
        <div>{children}</div>
      </div>
    </div>
  );
}