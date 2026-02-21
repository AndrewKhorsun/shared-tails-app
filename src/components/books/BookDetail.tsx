import type { ReactNode } from "react";
import type { Book } from "../../types";
import { Card, CardBody } from "../ui/Card";
import { Button } from "../ui/Button";
import "./BookDetail.css";

interface BookDetailProps {
  book: Book;
  onEdit?: () => void;
  onDelete?: () => void;
  isOwner?: boolean;
}

export function BookDetail({
  book,
  onEdit,
  onDelete,
  isOwner = false,
}: BookDetailProps): ReactNode {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="book-detail">
      <div className="book-detail-header">
        <div className="book-detail-info">
          <h1 className="book-detail-title">{book.title}</h1>
          <p className="book-detail-author">by {book.author_name}</p>
          <p className="book-detail-date">
            Published on {formatDate(book.created_at)}
            {book.updated_at !== book.created_at && (
              <span> · Updated on {formatDate(book.updated_at)}</span>
            )}
          </p>
        </div>
        {isOwner && (
          <div className="book-detail-actions">
            {onEdit && (
              <Button variant="secondary" onClick={onEdit}>
                Edit
              </Button>
            )}
            {onDelete && (
              <Button variant="danger" onClick={onDelete}>
                Delete
              </Button>
            )}
          </div>
        )}
      </div>

      {book.description && (
        <Card className="book-detail-description">
          <CardBody>
            <h3>Description</h3>
            <p>{book.description}</p>
          </CardBody>
        </Card>
      )}

      <Card className="book-detail-content">
        <CardBody>
          <div className="book-content-text">
            {book.content ? (
              book.content.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph || "\u00A0"}</p>
              ))
            ) : (
              <p className="no-content">No content available</p>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
