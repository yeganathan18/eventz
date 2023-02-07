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
      className="hover:bg-gray-100 min-h-max p-4 bg-white rounded-lg border border-gray-300"
    >
      <h2 className="text-lg font-medium">{name}</h2>
      <p className="text-gray-600 mt-2">Description: {description}</p>
      <p className="text-gray-600 mt-2">Date: {cdate}</p>
      <p className="text-gray-600 mt-2">Location: {location}</p>
      <p className="text-gray-600 mt-2">Seats: {max_seat}</p>
    </Link>
  );
};

export default EventCard;