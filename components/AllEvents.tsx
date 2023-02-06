import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";

const Alert = ({ text }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
);

export default function Todos() {
  const [events, setEvents] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [errorText, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    let { data: events, error } = await supabase.from("events").select("*");
    if (error) console.log("error", error);
    else setEvents(events);
  };

  console.log("events", events);

  const [searchTerm, setSearchTerm] = useState("");

  //   const addTodo = async (taskText) => {
  //     let task = taskText.trim()
  //     if (task.length) {
  //       let { data: todo, error } = await supabase
  //         .from('todos')
  //         .insert({ task, user_id: user.id })
  //         .single()
  //       if (error) setError(error.message)
  //       else setTodos([...todos, todo])
  //     }
  //   }

  //   const deleteTodo = async (id) => {
  //     try {
  //       await supabase.from('todos').delete().eq('id', id)
  //       setTodos(todos.filter((x) => x.id != id))
  //     } catch (error) {
  //       console.log('error', error)
  //     }
  //   }

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
          <div className="flex flex-col items-center justify-center rounded-md border border-gray-200 bg-white py-12">
            <h2 className="z-10 text-xl font-semibold text-gray-700">
              Show event cards here
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
