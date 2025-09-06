import authPermissions from "./auth.permission";
import profilePermissions from "./profile.permission";
import usersPermissions from "./users.permission";
import permissionsPermissions from "./permissions.permission";
import rolesPermissions from "./roles.permission";

const actionsValues = {
  ...authPermissions,
  ...profilePermissions,
  ...usersPermissions,
  ...permissionsPermissions,
  ...rolesPermissions,
};

export default actionsValues;
