import { useState } from "react";
import type { ReactNode, FormEvent } from "react";
import type { Book, CreateBookData, UpdateBookData } from "../../types";
import { Input, Textarea } from "../ui/Input";
import { Button } from "../ui/Button";
import "./BookForm.css";

interface BookFormProps {
  book?: Book;
  onSubmit: (data: CreateBookData | UpdateBookData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function BookForm({
  book,
  onSubmit,
  onCancel,
  isLoading = false,
}: BookFormProps): ReactNode {
  const [title, setTitle] = useState(book?.title ?? "");
  const [description, setDescription] = useState(book?.description ?? "");
  const [content, setContent] = useState(book?.content ?? "");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save book";
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      {error && <div className="book-form-error">{error}</div>}

      <Input
        label="Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter book title"
        required
      />

      <Input
        label="Description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Brief description (optional)"
      />

      <Textarea
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your book content here..."
        rows={10}
      />

      <div className="book-form-actions">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {book ? "Update Book" : "Create Book"}
        </Button>
      </div>
    </form>
  );
}
