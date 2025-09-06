import FormStorage from "../../storage/form.storage";
import { Body, Grid } from "../../system/interfaces/grid.intefrace";
import Form from "../../packages/forms/interfaces/form.interface";
import { Role } from "../datebase/models/role.model";
import { RoleInput } from "../datebase/model.inputs/role.input";

export default class RolesHelper {
  public static prepareToForm(role: Role): Form {
    return {
      title: `Редактировать ${role.name}`,
      labels: {
        name: {
          title: "Название",
          placeholder: "Название",
          type: "text",
          templateType: FormStorage.templateTypeText,
          required: true,
          value: role.name,
        },
        description: {
          title: "Описание",
          placeholder: "Описание",
          type: "text",
          templateType: FormStorage.templateTypeText,
          value: role.description,
        },
        permissions: {
          title: "Права",
          placeholder: "Описание",
          type: "select",
          templateType: FormStorage.templateTypeMultiSelectAdvanced,
          values: role.permissions?.map((item) => item.id) || [],
          list: "fields/permissions",
        },
      },
      method: "POST",
      action: `roles/role?id=${role.id}`,
    } as Form;
  }

  public static prepareToGrid(roles: Role[]): Grid {
    return {
      head: ["Id", "Название", "Описание", "Действия"],
      body: roles.map((role) => this.prepareToBody(role)),
    } as unknown as Grid;
  }

  protected static prepareToBody(role: Role): Body {
    return {
      columns: [
        role.id,
        role.name,
        role.description,
        [
          {
            title: "Удалить",
            url: `roles/delete/?id=${role.id}`,
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>`,
            method: "DELETE",
            confirm: `Вы точно хотите удалить роль ${role.name}?`,
          },
        ],
      ],
      actions: {
        rowActionUrl: `roles/grid-item?id=${role.id}`,
      },
    };
  }

  public static prepareRole(role: Role): RoleInput {
    return {
      name: role.name,
      description: role.description,
      permissions: role.permissions.map((permission) => permission.id),
    };
  }
}
