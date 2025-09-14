export enum Actions {
  GetUser = "getUser",
  GetPermissions = "getPermissions",
  UpdatePermissions = "updatePermissions",
  DeletePermissions = "deletePermissions",
  EditStatus = "editStatus",
  GetRoles = "getRoles",
  UpdateRoles = "updateRoles",
  DeleteRoles = "deleteRoles",
  GetStyles = "getStyles",
  UpdateStyles = "updateStyles",
  DeleteStyles = "deleteStyles",
  GetTrainings = "getTrainings",
  UpdateTrainings = "updateTrainings",
  DeleteTrainings = "deleteTrainings",
  GetUsers = "getUsers",
  UpdateUser = "updateUser",
  DeleteUser = "deleteUser",
}

const actionsValues = {
  ...Actions,
};

export default actionsValues;
