import { useParams } from '@tanstack/react-router';

export default function UserDetail() {
  const { userId } = useParams({ from: '/dashboard/users/$userId' });

  return <div>User Detail: {userId}</div>;
}
