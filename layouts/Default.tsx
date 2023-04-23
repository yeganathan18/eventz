import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import Nav from "@/components/navbar";
import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../utils/database.types";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

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
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [username, setUsername] = useState<Profiles["username"]>(null);
  const [userrole, setUserrole] = useState<Profiles["user_role"]>(null);

  useEffect(() => {
    getProfile();
  }, [user]);

  async function getProfile() {
    try {
      let { data, error, status } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setUserrole(data.user_role);
      }
    } catch (error) {}
  }

  // store the user's role in local storage
  useEffect(() => {
    if (userrole) {
      localStorage.setItem("userrole", userrole);
    }
  }, [userrole]);

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
