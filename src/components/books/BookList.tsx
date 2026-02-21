import type { ReactNode } from "react";
import type { Book } from "../../types";
import { BookCard } from "./BookCard";
import "./BookList.css";

interface BookListProps {
  books: Book[];
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
  emptyMessage?: string;
}

export function BookList({
  books,
  onEdit,
  onDelete,
  emptyMessage = "No books found",
}: BookListProps): ReactNode {
  if (books.length === 0) {
    return (
      <div className="book-list-empty">
        <span className="empty-icon">📚</span>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
