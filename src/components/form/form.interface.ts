export interface Form {
  title?: string;
  labels: { [key: string]: Label };
  action?: string;
  method?: string;
}

export interface Label {
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

export interface loginLabels {
  login: Label;
  hash: Label;
}

export interface registerLabels {
  login: Label;
  hash: Label;
  name: Label;
}
