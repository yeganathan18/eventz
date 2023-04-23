import { Metadata } from "next";
import Link from "next/link";

import { UserLoginForm } from "@/components/user-login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Enter your email to sign in to your account
            </p>
          </div>
          <UserLoginForm />
          <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
            <Link
              href="/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden h-full bg-black lg:block">
        <div className="flex flex-col items-center justify-center h-full mx-auto max-w-lg">
          <p className="text-white text-xl font-mono font-semibold">
            Each new day is a blank page in the diary of your life. The secret
            of success is in turning that diary into the best story you possibly
            can.
            <br />
            <br />
            — Douglas Pagels
          </p>
        </div>
      </div>
    </div>
  );
}
