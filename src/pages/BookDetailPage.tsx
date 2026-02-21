import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { booksApi } from "../api/client";
import { useAuth } from "../hooks/useAuth";
import type { Book, UpdateBookData, CreateBookData } from "../types";
import { BookDetail } from "../components/books/BookDetail";
import { BookForm } from "../components/books/BookForm";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import "./BookDetailPage.css";

export function BookDetailPage(): ReactNode {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBook = useCallback(async (): Promise<void> => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await booksApi.getById(Number(id));
      setBook(data);
    } catch {
      setError("Failed to load book");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  const handleUpdate = async (data: CreateBookData | UpdateBookData): Promise<void> => {
    if (!book) return;
    setIsSubmitting(true);
    try {
      const updatedBook = await booksApi.update(book.id, data as UpdateBookData);
      setBook(updatedBook);
      setIsEditing(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!book) return;
    setIsSubmitting(true);
    try {
      await booksApi.delete(book.id);
      navigate("/books");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="book-detail-loading">Loading book...</div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container">
        <div className="book-detail-error">
          <p>{error || "Book not found"}</p>
          <Link to="/books">
            <Button>Back to Library</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === book.author_id;

  return (
    <div className="container">
      <div className="book-detail-page">
        <Link to="/books" className="back-link">
          &larr; Back to Library
        </Link>

        <BookDetail
          book={book}
          isOwner={isOwner}
          onEdit={() => setIsEditing(true)}
          onDelete={() => setIsDeleting(true)}
        />

        <Modal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          title="Edit Book"
        >
          <BookForm
            key={book.id}
            book={book}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            isLoading={isSubmitting}
          />
        </Modal>

        <Modal
          isOpen={isDeleting}
          onClose={() => setIsDeleting(false)}
          title="Delete Book"
        >
          <div className="delete-confirmation">
            <p>
              Are you sure you want to delete <strong>"{book.title}"</strong>?
              This action cannot be undone.
            </p>
            <div className="delete-actions">
              <Button
                variant="secondary"
                onClick={() => setIsDeleting(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleDelete}
                isLoading={isSubmitting}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
