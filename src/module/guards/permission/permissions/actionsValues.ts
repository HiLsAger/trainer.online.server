import authPermissions from "./auth.permission";
import profilePermissions from "./profile.permission";
import usersPermissions from "./users.permission";
import rolesPermissions from "./fields.permission";
import permissionsPermissions from "./permissions.permission";

const actionsValues = {
  ...authPermissions,
  ...profilePermissions,
  ...usersPermissions,
  ...rolesPermissions,
  ...permissionsPermissions,
};

export default actionsValues;
