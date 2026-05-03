export interface Filter {
  usersIds: number[] | number | null;
}

export interface Grid {
  head: (string | number)[];
  body: Body[];
  options: Options;
}

export interface Body {
  columns: (string | number | Action[])[];
  actions?: Actions;
}

export interface Actions {
  rowActionUrl?: string | null;
}

export interface Action {
  url: string;
  title?: string | null;
  icon?: string | null;
  method?: string;
  confirm?: string;
}

export interface Options {
  page: number;
  limit: number;
  countPage: number;
}
