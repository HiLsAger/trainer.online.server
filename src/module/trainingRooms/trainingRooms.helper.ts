import FormStorage from "../../storage/form.storage";
import { Body, Grid } from "../../system/interfaces/grid.intefrace";
import Form from "../../packages/forms/interfaces/form.interface";
import { Flags } from "../../packages/forms/interfaces/label.interface";
import { Injectable } from "@nestjs/common";
import ApiFacade from "../api/api.facade";
import { TrainingRoom } from "../database/models/trainingRoom.model";
import { TrainingRoomsInput } from "../database/model.inputs/trainingRooms.input";

@Injectable()
export default class TrainingRoomsHelper {
  constructor(protected readonly api: ApiFacade) {}

  public prepareToForm(model: TrainingRoom): Form {
    return {
      title: `Редактировать ${model.name}`,
      labels: {
        name: {
          title: "Название",
          placeholder: "Название",
          type: "text",
          templateType: FormStorage.templateTypeText,
          required: true,
          value: model.name,
        },
        description: {
          title: "Описание",
          placeholder: "Описание",
          type: "text",
          templateType: FormStorage.templateTypeText,
          value: model.description,
        },
        style_id: {
          placeholder: "Стили",
          templateType: FormStorage.templateTypeSelectAdvanced,
          list: "fields/styles",
          title: "Стили",
          type: "text",
          flags: [Flags.AS_HTML],
        },
      },
      method: "POST",
      action: `training-rooms/room?id=${model.id}`,
    } as Form;
  }

  public prepareToGrid(models: TrainingRoom[]): Grid {
    return {
      head: ["Id", "Название", "Описание", "Цвет"],
      body: models.map((model) => this.prepareToBody(model)),
    } as unknown as Grid;
  }

  protected prepareToBody(model: TrainingRoom): Body {
    return {
      columns: [
        model.id,
        model.name,
        model.description,
        model.style ? this.api.styles.prepareStyleToTag(model.style) : null,
        [
          {
            title: "Удалить",
            url: `training-rooms/room/?id=${model.id}`,
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>`,
            method: "DELETE",
            confirm: `Вы точно хотите удалить зал ${model.name}?`,
          },
        ],
      ],
      actions: {
        rowActionUrl: `training-rooms/room?id=${model.id}`,
      },
    };
  }

  public prepareData(training: TrainingRoom): TrainingRoomsInput {
    return {
      name: training.name,
      description: training.description,
      sort: training.sort,
      style_id: training.style_id,
    };
  }
}
