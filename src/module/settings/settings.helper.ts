import { Injectable } from "@nestjs/common";
import Form from "../../packages/forms/interfaces/form.interface";
import FormStorage from "../../storages/form.storage";
import { Setting } from "../database/models/setting.model";
import Label from "../../packages/forms/interfaces/label.interface";

@Injectable()
export default class SettingsHelper {
  public prepareToForm(settings: Setting[], group: string): Form {
    const labels = {} as { [key: string]: Label };
    settings.forEach((setting) => {
      labels[setting.key] = {
        title: setting.name,
        placeholder: setting.name,
        templateType: this.getFieldTemplateByType(setting.value_type),
        type: setting.value_type,
        tooltip: setting.description,
        value: setting.value,
      };
    });

    return {
      title: `Настройки ${group}`,
      labels: labels,
      method: "POST",
      action: `settings/setting`,
    } as Form;
  }

  public getFieldTemplateByType(type: string): string {
    switch (type) {
      case "schedule":
        return FormStorage.templateTypeSchedule;
      case "json":
      case "array":
      case "boolean":
      case "number":
      case "string":
      default:
        return FormStorage.templateTypeText;
    }
  }
}
