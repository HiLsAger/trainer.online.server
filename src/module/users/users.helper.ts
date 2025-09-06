import { User } from "../datebase/models/user.model";
import FormStorage from "../../storage/form.storage";
import { Body, Grid } from "../../system/interfaces/grid.intefrace";
import Form from "../../packages/forms/interfaces/form.interface";

export default class UsersHelper {
  public static prepareUserToForm(user: User): Form {
    return {
      title: `Редактировать ${user.login}`,
      labels: {
        login: {
          title: "Логин",
          placeholder: "Логин",
          type: "text",
          templateType: FormStorage.templateTypeText,
          required: true,
          value: user.login,
        },
        name: {
          title: "Имя",
          placeholder: "Имя",
          type: "text",
          templateType: FormStorage.templateTypeText,
          required: true,
          value: user.name,
        },
        status: {
          title: "Статус",
          placeholder: "Статус",
          type: "text",
          templateType: FormStorage.templateTypeText,
          required: false,
          value: user.status,
        },
        role_id: {
          title: "Роль",
          placeholder: "Роль",
          type: "select",
          templateType: FormStorage.templateTypeSelect,
          list: "fields/roles",
          required: true,
          value: user.role_id,
        },
      },
      method: "POST",
      action: `users/user?id=${user.id}`,
    } as Form;
  }

  public static prepareUsers(users: User[]): Grid {
    return {
      head: ["Id", "Логин", "Имя", "Статус профиля", "Роль", "Действия"],
      body: users.map((user) => UsersHelper.prepareBody(user)),
    } as unknown as Grid;
  }

  protected static prepareBody(user: User): Body {
    return {
      columns: [
        user.id,
        user.login,
        user.name,
        user.status,
        user.role ? user.role.name : "",
        [
          {
            title: "Удалить",
            url: `users/delete/?id=${user.id}`,
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>`,
            method: "DELETE",
            confirm: `Вы точно хотите удалить пользователя ${user.login}?`,
          },
        ],
      ],
      actions: {
        rowActionUrl: `users/user?id=${user.id}`,
      },
    };
  }
}
