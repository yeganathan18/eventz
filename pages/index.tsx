import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="flex flex-col">
        <h1 className="text-center"> Welcome Back </h1>
        {!session ? (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["github"]}
          />
        ) : (
          <Account session={session} />
        )}
      </div>
    </main>
  );
};

export default Home;
