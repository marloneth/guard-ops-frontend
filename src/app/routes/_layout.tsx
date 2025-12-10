import { Outlet } from '@tanstack/react-router';

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Example navbar */}
      <header className="border-b bg-white p-4">
        <h1 className="font-bold">GuardOps</h1>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
