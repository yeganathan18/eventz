import { useRouter } from "next/router";
import AppLayout from "@/layouts/Default";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/initSupabase";

const Event = () => {
  const router = useRouter();
  let { slug } = router.query;
  const event_id = slug[0];

  const [event, setEvent] = useState({});
  const [errorText, setError] = useState("");

  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", event_id)
      .single();
    if (error) {
      setError(error.message);
    } else {
      setEvent(data);
    }
  };

  return (
    <AppLayout>
      <div className="h-36 border-b border-gray-200 bg-white">
        <div className="pt-10">
          <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl text-gray-600">
                  {" "}
                  Event ID: {event_id}
                </h1>
                <p className="text-sm text-gray-500 mt-4">
                  {" "}
                  Informations about the event{" "}
                  <span className="font-semibold text-black">
                    {event?.event_name}
                  </span>
                </p>
              </div>
              <button
                className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => router.back()}
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
        <div className="grid grid-cols-1 gap-3 my-10">
          <div className="flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
            <div>
              <h1 className="text-2xl text-gray-600">Page under construction 🛠️</h1>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Event;
