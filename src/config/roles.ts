export enum Roles {
  USER = 'USER',
  // ADMIN = 'admin',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum Permissions {
  ALLOW_ALL = '*',
}

export const RolePermissions: Record< Roles, Permissions[]> = {
  [Roles.SUPER_ADMIN]: [Permissions.ALLOW_ALL],
  [Roles.USER]: [Permissions.ALLOW_ALL],
};
