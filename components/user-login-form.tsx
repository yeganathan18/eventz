"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { useSupabase } from "@/app/supabase-provider";
import { toast } from "react-hot-toast";
import { Loader2 as Loader2Icon } from "lucide-react";

export interface UserAuthFormProps {
  className?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
}

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleLogin}>
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
            type="submit"
            className="rounded-md border mt-5 border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75  hover:bg-gray-700 active:scale-95"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2Icon className="mr-4 h-4 w-4 animate-spin" />
            ) : null}
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
