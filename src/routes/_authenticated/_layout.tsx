import { Outlet } from '@tanstack/react-router';

import { Sidebar } from '@/components/ui/Sidebar/Sidebar';

interface AuthenticatedLayoutProps {
  children?: React.ReactNode;
}

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-[240px_1fr] bg-gray-50">
      <Sidebar />

      <main className="p-6">{children || <Outlet />}</main>
    </div>
  );
}
