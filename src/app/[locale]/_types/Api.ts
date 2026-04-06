export type ApiResponse<T> = {
  data: T;
  errors: Record<string, unknown>;
  message: string;
  status: number;
};

export type PaginatedApiResponse<T> = ApiResponse<T> & {
  pagination: {
    total: number;
    lastPage: number;
    perPage: number;
    currentPage: number;
    nextPageUrl: string | null;
    previousPageUrl: string | null;
  };
};
