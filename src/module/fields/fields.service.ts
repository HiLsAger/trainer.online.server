import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../database/models/user.model";
import { AuthToken } from "../database/models/authTokens.model";
import { Role } from "../database/models/role.model";
import { Permission } from "../database/models/permission.model";
import ApiFacade from "../api/api.facade";
import StyleBuilder from "../api/styles/style.builder";

@Injectable()
export class FieldsService {
  constructor(
    @InjectModel(User) protected readonly modelUser: typeof User,
    @InjectModel(AuthToken) protected readonly modelAuthToken: typeof AuthToken,
    @InjectModel(Role) protected readonly modelRole: typeof Role,
    @InjectModel(Permission)
    protected readonly modelPermission: typeof Permission,
    protected readonly api: ApiFacade,
    protected readonly styleBuilder: StyleBuilder,
  ) {}

  public async getData(table: string): Promise<Record<string, string>> {
    switch (table) {
      case Role.tableName:
        return this.modelRole
          .findAll({
            attributes: ["id", "name"],
            raw: true,
          })
          .then((items) => this.arrayMap(items, "id", "name"));
      case Permission.tableName:
        return this.modelPermission
          .findAll({
            attributes: ["id", "name"],
            raw: true,
          })
          .then((items) => this.arrayMap(items, "id", "name"));
      default:
        return {};
    }
  }

  protected arrayMap(
    data: object[],
    index: string,
    value: string,
  ): Record<string, string> {
    const result: Record<string, string> = {};

    data.forEach((item: Record<string, any>) => {
      result[item[index]] = item[value];
    });

    return result;
  }

  public async getStyles(): Promise<Record<string, string>> {
    const styleInfoList = await this.api.styles.getBuildStyles();

    const styles: Record<string, string> = {};
    styleInfoList.forEach((styleInfo) => {
      styles[styleInfo.id] =
        this.styleBuilder.buildStyleHtmlFromStyleInfo(styleInfo);
    });

    return styles;
  }

  public async getTrainers(): Promise<Record<string, string>> {
    return this.api.users.getTrainers();
  }

  public async getTrainingRooms(): Promise<Record<string, string>> {
    return this.api.trainingRooms.getTrainingRooms();
  }
}
