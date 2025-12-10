import { Outlet } from '@tanstack/react-router';

export default function DashboardLayout() {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Dashboard</h2>
      <Outlet />
    </div>
  );
}
