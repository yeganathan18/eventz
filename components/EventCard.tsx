import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/initSupabase";

const EventCard = ({
  event_name,
  id,
  event_description,
  start_time,
  end_time,
  location,
  max_seats,
}: {
  id: string;
  event_name: string;
  event_description: string;
  start_time: any;
  end_time: any;
  location: string;
  max_seats: number;
}) => {
  let sdate = new Date(start_time).toLocaleDateString();
  let etime = new Date(end_time).toLocaleDateString();
  const [EditModal, setEditModal] = useState(false);

  const [formData, setFormData] = useState({
    event_name,
    event_description,
    start_time,
    end_time,
    location,
    max_seats,
    updated_at: new Date(),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (
      event_name ||
      max_seats ||
      start_time ||
      end_time ||
      location ||
      event_description
    ) {
      toast.error("Please fill all the fields");
    }
    // addEvent(formData);
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const formattedSdate = new Date(start_time).toISOString().substr(0, 10);
    const formattedEdate = new Date(end_time).toISOString().substr(0, 10);
    setFormData({
      ...formData,
      start_time: formattedSdate,
      end_time: formattedEdate,
    });
  }, []);

  // create update event table in supabase
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
      .match({ event_id: id });
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
      .match({ event_id: id });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Event deleted successfully");
    }
  };

  return (
    <>
      <div className="hover:bg-gray-100 min-h-max p-4 pb-2 bg-white rounded-lg border border-gray-300">
        <Link className="sm:h-4/5 flex flex-col" href={`/event/${id}`}>
          <h2 className="text-lg font-medium">{event_name}</h2>
          <p className="text-gray-600 mt-2">Description: {event_description}</p>
          <p className="text-gray-600 mt-2">Start Time: {sdate}</p>
          <p className="text-gray-600 mt-2">End Time: {etime}</p>
          <p className="text-gray-600 mt-2">Location: {location}</p>
          <p className="text-gray-600 mt-2">Seats: {max_seats}</p>
        </Link>
        {localStorage.getItem("userrole") === "admin" && (
          <div className="sm:h-1/5 px-4 pt-2 text-right z-100">
            <button
              className="p-1 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg w-full sm:w-fit mb-2 sm:mt-0 sm:mr-2"
              onClick={() => setEditModal(true)}
            >
              Edit
            </button>
            <button
              className="p-1 px-4 bg-red-200 hover:bg-red-300 rounded-lg w-full sm:w-fit"
              onClick={deleteEvent}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {EditModal && (
        <div className="h-screen fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-400 opacity-75"></div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full">
            <form onSubmit={handleSubmit}>
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
                    value={formData.event_name}
                    onChange={handleInputChange}
                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>

                <div className="my-4">
                  <label
                    htmlFor="max_seat"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Max seat
                  </label>

                  <input
                    type="number"
                    id="max_seats"
                    name="max_seats"
                    placeholder="Max seats"
                    value={formData.max_seats}
                    onChange={handleInputChange}
                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Start Time
                  </label>
                  <input
                    type="date"
                    id="start_time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleInputChange}
                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    End Time
                  </label>
                  <input
                    type="date"
                    id="end_time"
                    name="end_time"
                    value={formData.end_time}
                    onChange={handleInputChange}
                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Enter places like 'Kathmandu, Nepal'"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
                <div className="my-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.event_description}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        event_description: e.target.value,
                      });
                    }}
                    className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    rows={5}
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button
                    type="button"
                    className="rounded-md border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 active:scale-95"
                    onClick={() => updateEvent(formData)}
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
};

export default EventCard;
