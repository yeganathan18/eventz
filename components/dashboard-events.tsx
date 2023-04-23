"use client";

import { Input } from "./input";
import { useSupabase } from "../app/supabase-provider";
import { useEffect, useState } from "react";
import { Loader2 as Loader2Icon, RefreshCw as RefreshIcon } from "lucide-react";

export default function DashboardEvents(props) {
  const { supabase } = useSupabase();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    let { data: events, error } = await supabase
    .from('events')
    .select('*')

    if (error) {
      console.log(error);
    } else {
        console.log(events)
    //   setEvents(events);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl md:px-20 px-2.5">
      <div className="flex items-center gap-4">
        <Input placeholder="Search" className="max-w-md" />
        <button className="rounded-md border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95">
          Create Event
        </button>{" "}
        <button className="rounded-md border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95 flex gap-2 items-center">
          <RefreshIcon className="h-4 w-4"/> Reload
        </button>{" "}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 cursor-pointer gap-8 mt-10">
        {loading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          events.map((event) => (
            <div
              key={event.event_id}
              className="bg-white border border-gray-200 shadow-sm rounded-lg hover:border-gray-500 max-w-sm"
            >
              <div className="h-48 w-full rounded-t-lg bg-gray-100" />
              <div className="flex flex-col gap-2 bg-white p-5 rounded-b-lg">
                <h1 className="text-xl font-semibold">{event?.event_name}</h1>
                <p className="text-gray-400 text-sm">
                  Event Date: {event.event_start_time}
                </p>
                <button className="rounded-md border mt-4 border-black bg-white px-5 py-2 text-sm font-medium text-black transition-all duration-75 hover:bg-gray-800 hover:text-white active:scale-95">
                  Edit Event
                </button>
                <button className="rounded-md border mt-2 border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-gray-800 hover:text-white active:scale-95">
                  Register Event
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
