import { Panel } from '@/components/ui/Panel/Panel';
import { Text } from '@/components/ui/Text/Text';
import { Link } from '@tanstack/react-router';

export default function UsersIndex() {
  return (
    <div className="space-y-6">
        <Panel className="p-6">
          <div className="flex justify-between items-center mb-6">
            <Text as="h2" className="text-xl font-semibold">
              User Management
            </Text>
            <Link
              to="/dashboard/roles"
              className="inline-flex items-center font-medium rounded-md transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:cursor-not-allowed bg-primary-600 hover:bg-primary-700 text-white border border-primary-700 px-3 py-1.5 text-sm"
            >
              Manage Roles
            </Link>
          </div>
          
          <Text variant="muted">
            User management functionality will be implemented here. You can manage user roles by clicking the button above.
          </Text>
        </Panel>
    </div>
  );
}
