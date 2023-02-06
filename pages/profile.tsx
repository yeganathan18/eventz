import Account from "@/components/Account";
import AppLayout from "@/layouts/Default";
import { useSession } from "@supabase/auth-helpers-react";

const Profile = () => {
  const session = useSession();
  return (
    <AppLayout>
      <div className="h-36 border-b border-gray-200 bg-white">
        <div className="pt-10">
          <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl text-gray-600"> Profile </h1>
                <p className="text-sm text-gray-500 mt-4">
                  {" "}
                  You can change your profile settings here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {session ? (
        <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
          <div className="grid grid-cols-1 gap-3 my-10">
            <div className="flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
              <h2 className="z-10 text-xl font-semibold text-gray-700">
                hello
              </h2>
              <Account session={session} />
            </div>
          </div>
        </div>
      ) : null}
    </AppLayout>
  );
};

export default Profile;
