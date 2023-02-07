import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";
import EventCard from "./EventCard";

const Alert = ({ text }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
);

export default function AllEvents(props) {
  const [events, setEvents] = useState([]);
  const [errorText, setError] = useState("");
  const [isSearching, setisSearching] = useState(false);

  // if props.isUpdate is true, fetch events from db

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    let { data: events, error } = await supabase.from("events").select("*");
    if (error) console.log("error", error);
    else setEvents(events);
  };

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
        <div className="my-5 hidden w-full justify-start sm:flex">
          <div className="flex flex-row gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setisSearching(true);
              }}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 md:w-96"
              placeholder="Search events"
            />
            <button
              type="submit"
              className="rounded-md border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75  hover:bg-gray-700 active:scale-95"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {!!errorText && <Alert text={errorText} />}
      <div className="mx-auto max-w-screen-xl px-2.5 md:px-20 pb-8">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-col px-12 rounded-md border border-gray-200 bg-white py-12">
            {/* create grid cards with 3 col */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 justify-evenly">
              {!isSearching
                ? events?.map((event) => (
                    <EventCard
                      key={event.event_id}
                      id={event.event_id}
                      event_name={event.event_name}
                      event_description={event.event_description}
                      start_time={event.event_start_time}
                      end_time={event.event_end_time}
                      location={event.location}
                      max_seats={event.max_seats}
                    />
                  ))
                : // TODO: add debounce to search input
                  events
                    ?.filter((event) => {
                      if (searchTerm === "") {
                        return event;
                      } else if (
                        event.event_name
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return event;
                      }
                    })
                    .map((event) => (
                      <EventCard
                        key={event.event_id}
                        id={event.event_id}
                        event_name={event.event_name}
                        event_description={event.event_description}
                        start_time={event.event_start_time}
                        end_time={event.event_end_time}
                        location={event.location}
                        max_seats={event.max_seats}
                      />
                    ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
