import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  if (session) {
    router.push("/dashboard");
  }

  return (
    <main className="h-screen w-3/4 md:w-1/2 xl:w-1/4 mx-auto flex justify-center items-center">
      <div className="flex flex-col w-full">
        <h1 className="text-center text-2xl font-medium"> Welcome Back 😃</h1>
        {!session ? (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            // providers={["github"]}
            redirectTo="/dashboard"
          />
        ) : null}
      </div>
    </main>
  );
};

export default Home;
