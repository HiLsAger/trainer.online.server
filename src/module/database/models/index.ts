import { AuthToken } from "./authTokens.model";
import { Permission } from "./permission.model";
import { Role } from "./role.model";
import { RolePermission } from "./rolePermission.model";
import { User } from "./user.model";
import { Schedule } from "./schedule.model";
import { ModelCtor } from "sequelize-typescript";
import { Training } from "./training.model";
import { Style } from "./style.model";
import { TrainingRoom } from "./trainingRoom.model";
import { Setting } from "./setting.model";

export const models = [
  User,
  AuthToken,
  Role,
  RolePermission,
  Permission,
  Schedule,
  Training,
  TrainingRoom,
  Style,
  Setting,
] as ModelCtor[];
