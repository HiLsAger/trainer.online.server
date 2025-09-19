export default interface Label {
  title: string;
  value?: string | number | boolean;
  values?: string[] | number[];
  placeholder?: string;
  templateType: string;
  type?: string;
  required?: boolean;
  tooltip?: string;
  list?: string | object;
  max?: number;
  min?: number;
  size?: number;
  flags?: Flags[];
}

export enum Flags {
  AS_HTML = "as_html",
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
