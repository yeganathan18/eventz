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
    <main className="h-screen flex justify-center items-center">
      <div className="form-container">
        <h1 className="text-center"> Welcome Back </h1>
        {!session ? (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["github"]}
            redirectTo="/dashboard"
          />
        ) : null}
      </div>
    </main>
  );
};

export default Home;
