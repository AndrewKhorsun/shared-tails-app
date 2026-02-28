import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import type {
  AuthResponse,
  Book,
  CreateBookData,
  LoginCredentials,
  RegisterCredentials,
  UpdateBookData,
  User,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL || "";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const isAuthCheck = error.config?.url?.includes("/api/auth/me");
      if (!isAuthCheck) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/api/auth/login",
      credentials
    );
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/api/auth/register",
      credentials
    );
    return response.data;
  },

  me: async (): Promise<User> => {
    const response = await apiClient.get<{ user: User }>("/api/auth/me");
    return response.data.user;
  },
};

export const booksApi = {
  getAll: async (): Promise<Book[]> => {
    const response = await apiClient.get<{ books: Book[] }>("/api/books");
    return response.data.books;
  },

  getById: async (id: number): Promise<Book> => {
    const response = await apiClient.get<{ book: Book }>(`/api/books/${id}`);
    return response.data.book;
  },

  create: async (data: CreateBookData): Promise<Book> => {
    const response = await apiClient.post<{ book: Book }>("/api/books", data);
    return response.data.book;
  },

  update: async (id: number, data: UpdateBookData): Promise<Book> => {
    const response = await apiClient.put<{ book: Book }>(
      `/api/books/${id}`,
      data
    );
    return response.data.book;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/books/${id}`);
  },
};

export default apiClient;
