import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
  createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/module/datebase/models/user.model";
import authPermissions from "./permissions/auth.permission";
import profilePermissions from "./permissions/profile.permission";
import usersPermissions from "./permissions/users.permission";

export class Article {
  id: number;
}

type Actions = authPermissions | profilePermissions | usersPermissions;

const ActionsValues = {
  ...authPermissions,
  ...profilePermissions,
  ...usersPermissions,
};

type Subjects = InferSubjects<typeof Article | typeof User>;

export type AppAbility = PureAbility<[Actions, Subjects]>;
@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      createMongoAbility,
    );

    user.role.permissions.forEach((permission) => {
      const action = permission.name as Actions;
      if (Object.values(ActionsValues).includes(action)) {
        can(action, Article);
      }
    });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
