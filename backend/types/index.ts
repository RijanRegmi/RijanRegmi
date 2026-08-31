export interface IApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
  errors?: any[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
