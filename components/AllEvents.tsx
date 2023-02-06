import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";

const Alert = ({ text }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
);

const GridCard = ({
  name,
  id,
  description,
  date,
  location,
  max_seat,
}: {
    id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  max_seat: number;
}) => {

    let cdate = new Date(date).toLocaleDateString();
  return (
    <Link
        href={`/event/${id}`}
      className="hover:bg-gray-100 min-h-max p-4 bg-white rounded-lg border border-gray-300"
    >
      <h2 className="text-lg font-medium">{name}</h2>
      <p className="text-gray-600 mt-2">Description: {description}</p>
      <p className="text-gray-600 mt-2">Date: {cdate}</p>
      <p className="text-gray-600 mt-2">Location: {location}</p>
      <p className="text-gray-600 mt-2">Seats {max_seat}</p>
    </Link>
  );
};

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [errorText, setError] = useState("");

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
              onChange={(e) => setSearchTerm(e.target.value)}
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
      <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-col px-12 rounded-md border border-gray-200 bg-white py-12">
            {/* create grid cards with 3 col */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 justify-evenly">
                {events.map((event) => (
                    <GridCard
                        key={event.id}
                        id={event.id}
                        name={event.event_name}
                        description={event.event_description}
                        date={event.event_date}
                        location={event.location}
                        max_seat={event.max_seat}
                    />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
