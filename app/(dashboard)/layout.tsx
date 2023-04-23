import Nav from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Nav />
      <main className="bg-gray-100 h-full">{children}</main>
    </div>
  );
}
