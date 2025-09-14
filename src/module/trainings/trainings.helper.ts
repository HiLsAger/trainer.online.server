import FormStorage from "../../storage/form.storage";
import { Body, Grid } from "../../system/interfaces/grid.intefrace";
import Form from "../../packages/forms/interfaces/form.interface";
import { Training } from "../database/models/training.model";
import { TrainingInput } from "../database/model.inputs/training.input";

export default class TrainingsHelper {
  public static prepareToForm(training: Training): Form {
    return {
      title: `Редактировать ${training.name}`,
      labels: {
        name: {
          title: "Название",
          placeholder: "Название",
          type: "text",
          templateType: FormStorage.templateTypeText,
          required: true,
          value: training.name,
        },
        description: {
          title: "Описание",
          placeholder: "Описание",
          type: "text",
          templateType: FormStorage.templateTypeText,
          value: training.description,
        },
      },
      method: "POST",
      action: `trainings/training?id=${training.id}`,
    } as Form;
  }

  public static prepareToGrid(trainings: Training[]): Grid {
    return {
      head: ["Id", "Название", "Описание", "Цвет"],
      body: trainings.map((training) => this.prepareToBody(training)),
    } as unknown as Grid;
  }

  protected static prepareToBody(training: Training): Body {
    return {
      columns: [
        training.id,
        training.name,
        training.description,
        [
          {
            title: "Удалить",
            url: `trainings/training/?id=${training.id}`,
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>`,
            method: "DELETE",
            confirm: `Вы точно хотите удалить тренеровку ${training.name}?`,
          },
        ],
      ],
      actions: {
        rowActionUrl: `trainings/training?id=${training.id}`,
      },
    };
  }

  public static prepareData(training: Training): TrainingInput {
    return {
      name: training.name,
      description: training.description,
    };
  }
}
