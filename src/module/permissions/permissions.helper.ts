import FormStorage from "../../storage/form.storage";
import { Permission } from "../database/models/permission.model";
import { Body, Grid } from "../../system/interfaces/grid.intefrace";
import Form from "../../packages/forms/interfaces/form.interface";

export default class PermissionsHelper {
  public static prepareToForm(permission: Permission): Form {
    return {
      title: `Редактировать ${permission.name}`,
      labels: {
        login: {
          title: "Название",
          placeholder: "Название",
          type: "text",
          templateType: FormStorage.templateTypePreviewText,
          required: true,
          value: permission.name,
        },
        name: {
          title: "Описание",
          placeholder: "Описание",
          type: "text",
          templateType: FormStorage.templateTypePreviewText,
          required: true,
          value: permission.description,
        },
      },
      method: "POST",
      action: `permissions/permission?id=${permission.id}`,
    } as Form;
  }

  public static prepareToGrid(permissions: Permission[]): Grid {
    return {
      head: ["Id", "Название", "Описание"],
      body: permissions.map((user) => this.prepareToBody(user)),
    } as unknown as Grid;
  }

  protected static prepareToBody(permission: Permission): Body {
    return {
      columns: [permission.id, permission.name, permission.description],
      actions: {
        rowActionUrl: `permissions/grid-item?id=${permission.id}`,
      },
    };
  }
}
