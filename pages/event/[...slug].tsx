"use client";

import { useRouter } from "next/router";
import AppLayout from "@/layouts/Default";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/initSupabase";
import toast from "react-hot-toast";
import { useUser } from "@supabase/auth-helpers-react";
import Map from "@/components/Map";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const Event = () => {
  const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
    ssr: false
  });
  
  const user = useUser();
  const router = useRouter();
  let { slug } = router.query;
  const event_id = slug[0];
  const [registered, setRegistered] = useState(false);
  const [mapMounted, setMapMounted] = useState(false);

  const [event, setEvent] = useState({});

  useEffect(() => {
    getEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEvent = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("event_id", event_id)
      .single();
    if (error) {
      toast.error(error.message);
    } else {
      setEvent(data);
    }
  };

  const uniqueCode = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const registerEvent = async () => {
    const { data, error } = await supabase
      .from("registrations")
      .insert([
        { event_id: event_id, user_id: user?.id, unique_code: uniqueCode() },
      ]);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("You have successfully registered for this event!");
      setRegistered(true);
    }
  };


  const checkIfRegistered = async () => {
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("event_id", event_id)
      .eq("user_id", user?.id);
    if (error) {
      toast.error(error.message);
    } else {
      setRegistered(data.length > 0);
    }
  };

  useEffect(() => {
    checkIfRegistered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // delete the registration
  const unregisterEvent = async () => {
    const { data, error } = await supabase
      .from("registrations")
      .delete()
      .eq("event_id", event_id)
      .eq("user_id", user?.id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("You have successfully unregistered for this event!");
      setRegistered(false);
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
                    {/* @ts-ignore */}
                    {event?.event_name}
                  </span>
                </p>
              </div>
              {!registered ? (
                <button
                  className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => registerEvent()}
                >
                  Register
                </button>
              ) : (
                <button
                  className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => unregisterEvent()}
                >
                  Unregister
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
        <div className="grid grid-cols-1 gap-3 my-10">
          <div className="flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
            <div>
              <h1 className="text-2xl text-gray-600">
                Page under construction 🛠️
              </h1>
            </div>
            
            <MapWithNoSSR />
              
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Event;
