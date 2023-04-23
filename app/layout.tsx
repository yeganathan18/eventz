import "./globals.css";
import SupabaseProvider from "./supabase-provider";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import ToastWrapper from "@/components/toast-wrapper";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    default: "Eventz App",
    template: "%s | Eventz",
  },
  description: "Now let's magically manage all your events",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white font-sans text-slate-900 antialiased",
        fontSans.variable
      )}
      suppressHydrationWarning
    >
      <body>
        
        <SupabaseProvider>
        <ToastWrapper>
        {children}
        </ToastWrapper>
        </SupabaseProvider>
      </body>
    </html>
  );
}
