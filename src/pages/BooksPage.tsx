import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useBooks } from "../hooks/useBooks";
import type { Book, CreateBookData, UpdateBookData } from "../types";
import { BookList } from "../components/books/BookList";
import { BookForm } from "../components/books/BookForm";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import "./BooksPage.css";

export function BooksPage(): ReactNode {
  const { books, isLoading, error, fetchBooks, createBook, updateBook, deleteBook } =
    useBooks();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleCreate = async (data: CreateBookData | UpdateBookData): Promise<void> => {
    setIsSubmitting(true);
    try {
      await createBook(data as CreateBookData);
      setIsCreateModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: CreateBookData | UpdateBookData): Promise<void> => {
    if (!editingBook) return;
    setIsSubmitting(true);
    try {
      await updateBook(editingBook.id, data as UpdateBookData);
      setEditingBook(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (!deletingBook) return;
    setIsSubmitting(true);
    try {
      await deleteBook(deletingBook.id);
      setDeletingBook(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading && books.length === 0) {
    return (
      <div className="container">
        <div className="books-loading">Loading your books...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="books-error">
          <p>Error: {error}</p>
          <Button onClick={fetchBooks}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container books-page">
      <div className="books-header">
        <div>
          <h1>My Library</h1>
          <p className="books-count">
            {books.length} {books.length === 1 ? "book" : "books"}
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsCreateModalOpen(true)}>
          + New Book
        </Button>
      </div>

      <BookList
        books={books}
        onEdit={setEditingBook}
        onDelete={setDeletingBook}
        emptyMessage="You haven't created any books yet. Click 'New Book' to get started!"
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Book"
      >
        <BookForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={isSubmitting}
        />
      </Modal>

      <Modal
        isOpen={!!editingBook}
        onClose={() => setEditingBook(null)}
        title="Edit Book"
      >
        {editingBook && (
          <BookForm
            key={editingBook.id}
            book={editingBook}
            onSubmit={handleUpdate}
            onCancel={() => setEditingBook(null)}
            isLoading={isSubmitting}
          />
        )}
      </Modal>

      <Modal
        isOpen={!!deletingBook}
        onClose={() => setDeletingBook(null)}
        title="Delete Book"
      >
        <div className="delete-confirmation">
          <p>
            Are you sure you want to delete <strong>"{deletingBook?.title}"</strong>?
            This action cannot be undone.
          </p>
          <div className="delete-actions">
            <Button
              variant="secondary"
              onClick={() => setDeletingBook(null)}
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
  );
}
