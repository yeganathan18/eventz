import Link from "next/link";

const EventCard = ({
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
      className="hover:bg-gray-100 min-h-max p-4 pb-2 bg-white rounded-lg border border-gray-300"
    >
      <div className="sm:h-4/5">
        <h2 className="text-lg font-medium">{name}</h2>
        <p className="text-gray-600 mt-2">Description: {description}</p>
        <p className="text-gray-600 mt-2">Date: {cdate}</p>
        <p className="text-gray-600 mt-2">Location: {location}</p>
        <p className="text-gray-600 mt-2">Seats: {max_seat}</p>
      </div>
      <div className="sm:h-1/5 px-4 pt-2 text-right sm:px-6">
        <button className="p-1 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg w-full sm:w-fit mb-2 sm:mt-0 sm:mr-2">
          Edit
        </button>
        <button className="p-1 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg w-full sm:w-fit">
          Delete
        </button>
      </div>
    </Link>
  );
};

export default EventCard;
