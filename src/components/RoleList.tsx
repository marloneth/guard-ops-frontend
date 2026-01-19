import { useQuery } from '@tanstack/react-query';
import { rolesService, type Role } from '@/services/roles';
import { Button } from '@/components/ui/Button/Button';
import { Panel } from '@/components/ui/Panel/Panel';
import { Text } from '@/components/ui/Text/Text';

interface RoleListProps {
  onCreateRole: () => void;
  onEditRole: (role: Role) => void;
}

export function RoleList({ onCreateRole, onEditRole }: RoleListProps) {
  const {
    data: roles = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['roles'],
    queryFn: () => rolesService.getAll(),
  });

  if (isLoading) {
    return (
      <Panel className="p-6">
        <Text>Loading roles...</Text>
      </Panel>
    );
  }

  if (error) {
    return (
      <Panel className="p-6">
        <Text className="text-red-600">
          Error loading roles: {error.message}
        </Text>
      </Panel>
    );
  }



  return (
    <Panel className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Text as="h2" className="text-xl font-semibold">
          Role Management
        </Text>
        <Button onClick={onCreateRole}>Create Role</Button>
      </div>

      {roles.length === 0 ? (
        <Text>No roles found.</Text>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {role.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-semibold ${
                        role.name === 'ADMIN' 
                          ? 'bg-danger text-white'
                          : role.name === 'SUPERVISOR'
                          ? 'bg-warning text-black'
                          : 'bg-success text-white'
                      }`}
                    >
                      {role.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(role.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onEditRole(role)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  );
}