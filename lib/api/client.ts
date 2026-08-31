/**
 * Centralized API Client
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  errors?: any[];
  statusCode?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        statusCode: response.status,
        message: data.message || `Request failed with status ${response.status}`,
        error: data.error || response.statusText,
        errors: data.errors,
      };
    }

    return {
      success: true,
      statusCode: response.status,
      message: data.message,
      data: data.data !== undefined ? data.data : data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || 'Network error occurred',
      error: error?.message,
    };
  }
}
