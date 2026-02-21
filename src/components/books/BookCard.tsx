import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Book } from "../../types";
import { Card, CardBody, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import "./BookCard.css";

interface BookCardProps {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
}

export function BookCard({ book, onEdit, onDelete }: BookCardProps): ReactNode {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card hoverable className="book-card">
      <div className="book-cover">
        <span className="book-cover-icon">📖</span>
      </div>
      <CardBody>
        <Link to={`/books/${book.id}`} className="book-title-link">
          <h3 className="book-title">{book.title}</h3>
        </Link>
        <p className="book-author">by {book.author_name}</p>
        {book.description && (
          <p className="book-description">{book.description}</p>
        )}
        <span className="book-date">{formatDate(book.created_at)}</span>
      </CardBody>
      {(onEdit || onDelete) && (
        <CardFooter>
          <div className="book-actions">
            {onEdit && (
              <Button variant="secondary" size="sm" onClick={() => onEdit(book)}>
                Edit
              </Button>
            )}
            {onDelete && (
              <Button variant="danger" size="sm" onClick={() => onDelete(book)}>
                Delete
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
