import { useState } from 'react';
import { type Role } from '@/services/roles';
import { RoleList } from './RoleList';
import { RoleForm } from './RoleForm';

export function RoleManagement() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  const handleCreateRole = () => {
    setIsCreating(true);
    setEditingRole(null);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setIsCreating(false);
  };

  const handleFormSuccess = () => {
    setIsCreating(false);
    setEditingRole(null);
  };

  const handleFormCancel = () => {
    setIsCreating(false);
    setEditingRole(null);
  };

  if (isCreating || editingRole) {
    return (
      <RoleForm
        role={editingRole || undefined}
        onSuccess={handleFormSuccess}
        onCancel={handleFormCancel}
      />
    );
  }

  return (
    <RoleList
      onCreateRole={handleCreateRole}
      onEditRole={handleEditRole}
    />
  );
}