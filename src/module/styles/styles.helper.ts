import FormStorage from "../../storage/form.storage";
import { Body, Grid } from "../../system/interfaces/grid.intefrace";
import Form from "../../packages/forms/interfaces/form.interface";
import { StyleInput } from "../database/model.inputs/style.input";
import { Style } from "../database/models/style.model";

export default class StylesHelper {
  public static prepareToForm(style: Style): Form {
    return {
      title: `Редактировать ${style.name}`,
      labels: {
        name: {
          title: "Название",
          placeholder: "Название",
          type: "text",
          templateType: FormStorage.templateTypeText,
          required: true,
          value: style.name,
        },
        background_color: {
          title: "Задний фон",
          placeholder: "Задний фон",
          type: "text",
          templateType: FormStorage.templateTypeColorPicker,
          required: false,
          value: style.background_color,
        },
        color: {
          title: "Цвет текста",
          placeholder: "Цвет текста",
          type: "text",
          templateType: FormStorage.templateTypeColorPicker,
          required: false,
          value: style.color,
        },
        font_size: {
          title: "Размер шрифта",
          placeholder: "Размер шрифта",
          type: "number",
          templateType: FormStorage.templateTypeText,
          required: false,
          value: style.font_size,
        },
        css: {
          title: "CSS стили поля",
          placeholder: "CSS стили поля",
          type: "text",
          templateType: FormStorage.templateTypeTextArea,
          required: false,
          value: style.css,
          size: 6,
        },
      },
      method: "POST",
      action: `styles/style?id=${style.id}`,
    } as Form;
  }

  public static prepareToGrid(styles: Style[]): Grid {
    return {
      head: [
        "Id",
        "Наименование",
        "Задний фон",
        "Цвет текста",
        "Размер шрифта",
        "CSS стили поля",
      ],
      body: styles.map((style) => this.prepareToBody(style)),
    } as unknown as Grid;
  }

  protected static prepareToBody(style: Style): Body {
    return {
      columns: [
        style.id,
        style.name,
        '<p style="background-color: ' +
          style.background_color +
          '">Тестовый текст</p>',
        '<p style="color: ' + style.color + '">Тестовый текст</p>',
        '<p style="font-size: ' + style.font_size + 'px">Тестовый текст</p>',
        '<p style="' + style.css + '">Тестовый текст</p>',
        [
          {
            title: "Удалить",
            url: `styles/style/?id=${style.id}`,
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>`,
            method: "DELETE",
            confirm: `Вы точно хотите удалить стиль ${style.name}?`,
          },
        ],
      ],
      actions: {
        rowActionUrl: `styles/style?id=${style.id}`,
      },
    };
  }

  public static prepareData(style: Style): StyleInput {
    return {
      name: style.name,
      background_color: style.background_color,
      color: style.color,
      font_size: style.font_size,
      css: style.css,
    };
  }
}
