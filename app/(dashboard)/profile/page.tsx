import UserProfile from "@/components/user-profile";

export const metadata = {
  title: "Profile",
};

export default function Dashboard() {
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-2.5 md:px-20 py-10">
        <h1 className="text-2xl font-semibold">Profile Settings</h1>
        <p className="text-gray-400 text-sm pt-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="bg-white py-10">
        <div className="mx-auto max-w-screen-xl md:px-20 px-2.5">
          <UserProfile />
        </div>
      </div>
    </>
  );
}
