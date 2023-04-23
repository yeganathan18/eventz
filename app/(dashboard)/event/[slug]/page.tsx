interface EventPageProps {
  params: {
    slug: string;
  };
}

async function getEventFromParams(params) {
  const slug = params?.slug;
  return slug;
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventFromParams(params);
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-2.5 md:px-20 py-10">
        <h1 className="text-2xl font-semibold">Event Page</h1>
        <p className="text-gray-400 text-sm pt-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="bg-white py-10">
        <div className="mx-auto max-w-screen-xl md:px-20 px-2.5">
          Event ID : {event}
        </div>
      </div>
    </>
  );
}
