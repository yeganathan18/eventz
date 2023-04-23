"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import Link from "next/link";
import { useSupabase } from "@/app/supabase-provider";
import { useState } from "react";
import { Loader2 as Loader2Icon } from "lucide-react";
import { toast } from "react-hot-toast";

export interface UserAuthFormProps {
  className?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
}

export function UserSignupForm({ className, ...props }: UserAuthFormProps) {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your email for the login link!");
      setEmail("");
      setPassword("");
    }
    setIsLoading(false);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSignUp}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="top secret password"
              type="password"
            />
          </div>
          <button
            className="rounded-md border mt-5 border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 flex items-center justify-center hover:bg-gray-700 active:scale-95"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2Icon className="mr-4 h-4 w-4 animate-spin" />
            ) : null}
            Continue
          </button>
        </div>
      </form>
      <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <Link
          href="/login"
          className="hover:text-brand underline underline-offset-4"
        >
          Have an account? Sign In
        </Link>
      </p>
    </div>
  );
}
