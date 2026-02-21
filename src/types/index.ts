export interface User {
  id: number;
  username: string;
  created_at?: string;
}

export interface Book {
  id: number;
  title: string;
  description: string;
  content: string;
  author_id: number;
  author_name: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  password: string;
}

export interface CreateBookData {
  title: string;
  description?: string;
  content?: string;
}

export interface UpdateBookData {
  title?: string;
  description?: string;
  content?: string;
}

export interface ApiError {
  error: string;
}
