import Label from "./label.interface";

export default interface Form {
  alias?: string;
  action?: string;
  labels: { [key: string]: Label };
  method?: string;
  title?: string;
}
