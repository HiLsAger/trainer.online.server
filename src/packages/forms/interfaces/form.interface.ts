import Label from "./label.interface";

export default interface Form {
  action?: string;
  labels: { [key: string]: Label };
  method?: string;
  title?: string;
}
