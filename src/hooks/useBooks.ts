import { useState, useCallback } from "react";
import { booksApi } from "../api/client";
import type { Book, CreateBookData, UpdateBookData } from "../types";

interface UseBooksReturn {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
  createBook: (data: CreateBookData) => Promise<Book>;
  updateBook: (id: number, data: UpdateBookData) => Promise<Book>;
  deleteBook: (id: number) => Promise<void>;
}

export function useBooks(): UseBooksReturn {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await booksApi.getAll();
      setBooks(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch books";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBook = useCallback(
    async (data: CreateBookData): Promise<Book> => {
      const newBook = await booksApi.create(data);
      setBooks((prev) => [newBook, ...prev]);
      return newBook;
    },
    []
  );

  const updateBook = useCallback(
    async (id: number, data: UpdateBookData): Promise<Book> => {
      const updatedBook = await booksApi.update(id, data);
      setBooks((prev) =>
        prev.map((book) => (book.id === id ? updatedBook : book))
      );
      return updatedBook;
    },
    []
  );

  const deleteBook = useCallback(async (id: number): Promise<void> => {
    await booksApi.delete(id);
    setBooks((prev) => prev.filter((book) => book.id !== id));
  }, []);

  return {
    books,
    isLoading,
    error,
    fetchBooks,
    createBook,
    updateBook,
    deleteBook,
  };
}
