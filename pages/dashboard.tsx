import AppLayout from "@/layouts/Default";
import AllEvents from "@/components/AllEvents";
import { useSession } from "@supabase/auth-helpers-react";

const Dashboard = () => {
  const session = useSession();
  return (
    // <AppLayout>
    //   <div className="h-36 border-b border-gray-200 bg-white">
    //     <div className="pt-10">
    //       <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
    //         <div className="flex items-center justify-between">
    //           <h1 className="text-2xl text-gray-600"> All Events </h1>

    //           <button className="rounded-md border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95">
    //             Create Event
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     {session ? (
    //       <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
    //         <div className="grid grid-cols-1 gap-3 my-10">
    //           <div className="flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
    //             <h2 className="z-10 text-xl font-semibold text-gray-700">
    //               hello
    //             </h2>
    //             <AllEvents />
    //           </div>
    //         </div>
    //       </div>
    //     ) : null}
    //   </div>
    // </AppLayout>

    <AppLayout>
      <div className="h-36 border-b border-gray-200 bg-white">
        <div className="pt-10">
          <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl text-gray-600"> All Events </h1>
                <p className="text-sm text-gray-500 mt-4">
                  {" "}
                  You can check all the listed events here.
                </p>
              </div>
              <button className="rounded-md border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95">
                Create Event
              </button>
            </div>
          </div>
        </div>
      </div>
      <AllEvents />
    </AppLayout>
  );
};

export default Dashboard;
