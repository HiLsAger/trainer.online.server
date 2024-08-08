import { AuthTocken } from './authTokens.model';
import { Permission } from './permission.model';
import { Role } from './role.model';
import { RolePermission } from './rolePermission.model';
import { User } from './user.model';

export const models = [User, AuthTocken, Role, RolePermission, Permission];
