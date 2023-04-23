"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSupabase } from "../app/supabase-provider";

export default function EventCard({ event, ...props }) {
  const { supabase } = useSupabase();

  const [editModal, setEditModal] = useState(false);


  const updateEvent = async (formData) => {
    const { data, error } = await supabase
      .from("events")
      .update({
        event_name: formData.event_name,
        event_description: formData.event_description,
        event_start_time: formData.start_time,
        event_end_time: formData.end_time,
        location: formData.location,
        max_seats: formData.max_seats,
        updated_at: formData.updated_at,
      })
      .match({ event_id: event.event_id });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Event updated successfully");
    }
  };

  const deleteEvent = async () => {
    const { data, error } = await supabase
      .from("events")
      .delete()
      .match({ event_id: event.event_id });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Event deleted successfully");
    }
  };

  return (
    <>
    <Link
      key={props.key}
      className="sm:h-4/5 flex flex-col"
      href={`/event/${event.event_id}`}
    >
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
          <button
            className="rounded-md border mt-4 border-black bg-white px-5 py-2 text-sm font-medium text-black transition-all duration-75 hover:bg-gray-100 hover:text-black active:scale-95"
            onClick={(event) => {
              event.preventDefault(); // prevent the card from redirecting
              setEditModal(true);
            }}
          >
            Edit Event
          </button>
          <button
            className="rounded-md border mt-2 border-red bg-red-400 px-5 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-red-600 hover:text-white active:scale-95"
            onClick={(event) => {
              event.preventDefault(); // prevent the card from redirecting
              deleteEvent();
            }}
          >
            Delete Event
          </button>
        </div>
      </div>
    </Link>
    {editModal && (
        <div className="h-screen fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-400 opacity-75"></div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full">
            <form>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h1 className="text-lg font-medium">Edit Event</h1>
                <div className="my-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="event_name"
                    name="event_name"
                    placeholder="Event Name"
                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>

              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button
                    type="button"
                    className="rounded-md border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 active:scale-95"
                  >
                    Save
                  </button>
                </span>
                <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setEditModal(false);
                    }}
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Cancel
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
