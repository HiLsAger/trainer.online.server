import { User } from "../datebase/models/user.model";
import { Body, Grid } from "./users.intefrace";
import { Form } from "../../components/form/form.interface";
import FormStorage from "../../storage/form.storage";

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
            icon: null,
            method: "DELETE",
          },
        ],
      ],
      actions: {
        rowActionUrl: `users/user?id=${user.id}`,
      },
    };
  }
}
