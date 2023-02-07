import AppLayout from "@/layouts/Default";
import AllEvents from "@/components/AllEvents";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState({
    show: false,
    message: "",
  });
  const [formData, setFormData] = useState({
    event_name: "",
    max_seat: 0,
    start_time: null,
    end_time: null,
    location: "",
    description: "",
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useUser();

  const addEvent = async (formData) => {
    console.log(formData, "form data");
    let item = formData;

    const { data, error } = await supabase.from("events").insert([
      {
        event_name: item.event_name,
        max_seats: Number(item.max_seat),
        event_start_time: item.start_time,
        event_end_time: item.end_time,
        location: item.location,
        event_description: item.description,
        created_by: user.id,
        created_at: new Date(),
      },
    ]);
    if (error) {
      setShowError({ show: true, message: error.message });
      toast.error(error.message);
    } else {
      setShowModal(false);
      toast.success("Event created successfully");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (
      !formData.event_name ||
      !formData.max_seat ||
      !formData.start_time ||
      !formData.end_time ||
      !formData.location ||
      !formData.description
    ) {
      setShowError({
        show: true,
        message: "Please fill all the fields",
      });
    }
    addEvent(formData);
    event.preventDefault();
  };

  // fetach user data
  const [userDetails, setUserDetails] = useState({});
  const fetchUser = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    if (error) {
      console.log(error, "error");
    } else {
      setUserDetails(data);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  return (
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
              {userDetails?.user_role === "admin" && (
                <button
                  className="rounded-md border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95"
                  onClick={() => setShowModal(true)}
                >
                  Create Event
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="h-screen fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-400 opacity-75"></div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-md sm:w-full">
            <form onSubmit={handleSubmit}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {showError.show && (
                  <div className="bg-red-100 text-sm border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">
                      Something went wrong. Please try again.
                    </span>
                  </div>
                )}
                <h1 className="text-lg font-medium">Create Event</h1>
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
                    id="max_seat"
                    name="max_seat"
                    placeholder="Max seats"
                    // value={formData.event_max_seat}
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
                    id="date"
                    name="date"
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
                    id="date"
                    name="date"
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
                    value={formData.description}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        description: e.target.value,
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
                    onClick={() => addEvent(formData)}
                  >
                    Save
                  </button>
                </span>
                <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setShowError({ show: false, message: "" });
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

      <AllEvents />
    </AppLayout>
  );
};

export default Dashboard;
