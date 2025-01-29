export interface Form {
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
