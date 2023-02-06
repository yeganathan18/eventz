import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import "../styles/globals.css";
import cx from "classnames";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <main className={cx(inter.variable, "font-sans")}>
        <Component {...pageProps} />
      </main>
    </SessionContextProvider>
  );
}
export default MyApp;
