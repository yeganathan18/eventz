import AppLayout from "@/layouts/Default";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/initSupabase";
import toast from "react-hot-toast";
import { useUser } from "@supabase/auth-helpers-react";
import EventCard from "@/components/EventCard";

const RegisteredEvents = () => {
  const user = useUser();
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("user_id", user?.id);
    if (error) {
      toast.error(error.message);
    } else {
      const events = data.map(async (event) => {
        const eventDetails = await getEventDetails(event.event_id);
        return eventDetails;
      });
      const resolvedEvents = await Promise.all(events);
      setEvents(resolvedEvents);
    }
  };

  // get the event details for each registration
  const getEventDetails = async (event_id) => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", event_id)
      .single();
    if (error) {
      toast.error(error.message);
    } else {
      return data;
    }
  };

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayout>
      <div className="h-36 border-b border-gray-200 bg-white">
        <div className="pt-10">
          <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl text-gray-600"> Registered Events </h1>
                <p className="text-sm text-gray-500 mt-4">
                  {" "}
                  You can check your registered events here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
        <div className="grid grid-cols-1 gap-3 my-10">
          <div className="flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 justify-evenly">
              {events.length > 0 ? (
                events.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    name={event.event_name}
                    description={event.event_description}
                    date={event.event_date}
                    location={event.event_location}
                    max_seat={event.max_seat}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500 mt-4">
                  {" "}
                  You have not registered for any events.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default RegisteredEvents;
