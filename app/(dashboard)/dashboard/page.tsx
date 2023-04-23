import DashboardEvents from "@/components/dashboard-events";

export const metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-2.5 md:px-20 py-10">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-400 text-sm pt-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="bg-white py-10">
        <DashboardEvents />
      </div>
    </>
  );
}
