export default interface Label {
  title: string;
  value?: string | number | boolean;
  placeholder?: string;
  templateType: string;
  type?: string;
  required?: boolean;
  tooltip?: string;
  list?: string | object;
  max?: number;
  min?: number;
}

export interface loginLabel {
  login: Label;
  hash: Label;
}

export interface registerLabel {
  login: Label;
  hash: Label;
  name: Label;
}
