import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  Session,
} from "@supabase/auth-helpers-react";
import { Database } from "../utils/database.types";
import toast from "react-hot-toast";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

export default function Account({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Profiles["username"]>(null);
  const [fullname, setFullname] = useState<Profiles["full_name"]>(null);
  const [email, setEmail] = useState<Profiles["email"]>(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setFullname(data.full_name);
        setEmail(session.user.email);
        console.log("data", data);
        console.log("session", session.user);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    full_name,
  }: {
    username: Profiles["username"];
    full_name: Profiles["full_name"];
  }) {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      const updates = {
        id: user.id,
        username: username,
        full_name: full_name,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .match({ id: user.id });

    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
      toast.success("Profile updated");
    }
  }

  return (
    <div className="mt-10 sm:mt-0 w-3/4 lg:w-1/2">
      <div className="mt-5 md:mt-0">
        <form action="#" method="POST">
          <div className="overflow-hidden">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="flex flex-col  gap-6">
                <div className="">
                  <label
                    htmlFor="first-name"
                    className="block text-base font-medium text-gray-700"
                  >
                    User name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 mt-2"
                  />
                </div>

                <div className="col-span-12">
                  <label
                    htmlFor="last-name"
                    className="block text-base font-medium text-gray-700"
                  >
                    Full name
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    value={fullname || ""}
                    onChange={(e) => setFullname(e.target.value)}
                    className="bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 mt-2"
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
                    disabled
                    className="bg-white cursor-not-allowed border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 mt-2"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                className="rounded-md border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95 w-full sm:w-fit"
                onClick={() => updateProfile({ username: username, full_name: fullname })}
                disabled={loading}
              >
                {loading ? "Loading ..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
