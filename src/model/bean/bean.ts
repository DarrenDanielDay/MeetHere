export interface Bean {
  id: number;
}

export type Optional<T> = {
  [K in keyof T]?: T[K];
}
