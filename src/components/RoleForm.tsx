import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rolesService, type Role } from '@/services/roles';
import { Button } from '@/components/ui/Button/Button';
import { Panel } from '@/components/ui/Panel/Panel';
import { Text } from '@/components/ui/Text/Text';

interface RoleFormProps {
  role?: Role;
  onSuccess: () => void;
  onCancel: () => void;
}

const ROLE_NAMES = ['ADMIN', 'SUPERVISOR', 'GUARD'] as const;

export function RoleForm({ role, onSuccess, onCancel }: RoleFormProps) {
  const [name, setName] = useState(role?.name || 'GUARD');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: { name: typeof ROLE_NAMES[number] }) =>
      rolesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      onSuccess();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { name: typeof ROLE_NAMES[number] }) =>
      rolesService.update(role!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      onSuccess();
    },
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name) {
      newErrors.name = 'Role name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const mutation = role ? updateMutation : createMutation;
    mutation.mutate({ name });
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Panel className="p-6">
        <Text as="h2" className="text-xl font-semibold mb-6">
          {role ? 'Edit Role' : 'Create Role'}
        </Text>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role Name
          </label>
          <select
            value={name}
            onChange={(e) => setName(e.target.value as typeof ROLE_NAMES[number])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {ROLE_NAMES.map((roleName) => (
              <option key={roleName} value={roleName}>
                {roleName}
              </option>
            ))}
          </select>
          {errors.name && (
            <Text className="text-red-600 text-sm mt-1">{errors.name}</Text>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : role ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Panel>
  );
}