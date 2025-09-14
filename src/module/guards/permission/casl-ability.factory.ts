import {
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
  createMongoAbility,
} from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/module/database/models/user.model";
import actionsValues, { Actions } from "./permissions/actionsValues";

export class Article {
  id: number;
}

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
      if (Object.values(actionsValues).includes(action)) {
        can(action, Article);
      }
    });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
