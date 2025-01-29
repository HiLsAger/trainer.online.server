export interface Filter {
  usersIds: number[] | number | null;
}

export interface Grid {
  head: (string | number)[];
  body: Body[];
}

export interface Body {
  columns: (string | number)[];
  actions?: Actions;
}

export interface Actions {
  rowActionUrl?: string | null;
  action?: Action[] | null;
}

export interface Action {
  url: string;
  title?: string | null;
  icon?: string | null;
}
