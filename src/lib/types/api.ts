export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: string }

export type PaginatedResponse<T> =
  | { data: T[]; count: number; error: null }
  | { data: null; count: null; error: string }
