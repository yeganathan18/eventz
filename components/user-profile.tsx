"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import { useSupabase } from "@/app/supabase-provider";
import { toast } from "react-hot-toast";

export default function UserProfile() {
  const { supabase } = useSupabase();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [user_id, setUserId] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    setUserId(user.id);
    setEmail(user.email);
    console.log("user", user);
    setLoading(false);
  };

  async function updateProfile({ email }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const { error } = await supabase
        .from("profiles")
        .update({
          email: email,
        })
        .match({ id: user.id });
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
      toast.success("Profile updated");
    }
  }

  return (
    // <div>
    //   <h1>Profile</h1>
    //   <pre>{JSON.stringify(user, null, 2)}</pre>
    // </div>
    <div className="mt-10 sm:mt-0 w-3/4 lg:w-1/2">
      <div className="mt-5 md:mt-0  border border-gray-300 p-5 rounded-lg">
        <div className="bg-white py-5">
          <div className="flex flex-col gap-6">
            <div className="">
              <label
                htmlFor="first-name"
                className="block text-base font-medium text-gray-700"
              >
                User Id
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                value={user_id}
                placeholder="Enter your username"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 mt-2"
                disabled
              />
            </div>

            <div className="col-span-10">
              <label
                htmlFor="email-address"
                className="block text-base font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="text"
                name="email-address"
                id="email-address"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white cursor-not-allowed border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 mt-2"
              />
            </div>
          </div>
        </div>
        <div className="py-3">
          <button
            type="submit"
            className="rounded-md border border-black bg-black px-6 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95 w-full sm:w-fit"
            onClick={() => updateProfile({ email: email })}
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
