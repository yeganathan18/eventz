"use client";

import { Input } from "./input";
import { useSupabase } from "../app/supabase-provider";
import { useEffect, useState } from "react";
import { Loader2 as Loader2Icon, RefreshCw as RefreshIcon } from "lucide-react";
import EventCard from "./event-card";

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
      console.log(events);
      setEvents(events);
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {loading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          events.map((event) => (
            <EventCard key={event?.event_id} event={event} />
          ))
        )}
      </div>
    </div>
  );
}
