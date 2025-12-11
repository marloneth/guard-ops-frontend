import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Welcome to GuardOps</h1>
      <p className="text-gray-600">
        Hello, {user?.name || user?.email || 'User'}! This is your dashboard
        home.
      </p>
    </div>
  );
}
