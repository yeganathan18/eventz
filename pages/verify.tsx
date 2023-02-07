import Account from "@/components/Account";
import AppLayout from "@/layouts/Default";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "../lib/initSupabase";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Verify = () => {
  //   get all registerations
  const [registerations, setRegisterations] = useState([]);

  const getAllRegisterations = async () => {
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .order("registration_id", { ascending: false });
    if (error) {
      toast.error(error.message);
    } else {
      //   only show the registerations that are not verified
      const filteredData = data.filter((item) => item.is_verified === false);
      setRegisterations(filteredData);
    }
  };

  console.log(registerations);

  useEffect(() => {
    getAllRegisterations();
  }, []);

  const verifyUser = async (id) => {
    const { data, error } = await supabase
      .from("registrations")
      .update({ is_verified: true })
      .eq("registration_id", id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("User verified successfully!");
      getAllRegisterations();
    }
  };

  return (
    <AppLayout>
      <div className="h-36 border-b border-gray-200 bg-white">
        <div className="pt-10">
          <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl text-gray-600"> Verify Users </h1>
                <p className="text-sm text-gray-500 mt-4">
                  {" "}
                  Unique codes of the users are verified here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
        <div className="grid grid-cols-1 gap-3 my-10">
          <div className="flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 justify-evenly px-12">
              {registerations?.length > 0 ? (
                registerations?.map((registeration) => (
                  <div
                    key={registeration?.id}
                    className="hover:bg-gray-100 min-h-max p-4 bg-white rounded-lg border border-gray-300"
                  >
                    <p>user_id: {registeration?.user_id}</p>
                    <p>event_id: {registeration?.event_id}</p>
                    <p className="text-violet-600">unique_code: {registeration?.unique_code}</p>
                    <button
                      className="bg-black hover:bg-gray-700 mt-4 text-white font-bold py-2 px-4 rounded-lg"
                      onClick={() => verifyUser(registeration?.registration_id)}
                    >
                      Verify
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 mt-4">No unverified registerations pending...!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Verify;
