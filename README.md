# Frontend

React + TypeScript SPA for a book management system with authentication.

## Stack

- **React 19** + **TypeScript 5**
- **Vite 7** — build tool and dev server
- **React Router DOM 7** — client-side routing
- **Axios** — HTTP client with auth interceptors
- **pnpm** — package manager

## Getting Started

```bash
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:5173` and proxies `/api` requests to `http://192.168.0.101:3000`.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

## Project Structure

```
src/
├── api/          # Axios client with auth interceptors
├── components/
│   ├── auth/     # Login and Register forms
│   ├── books/    # Book list, detail, card, form
│   ├── layout/   # Header, Footer, Layout
│   └── ui/       # Reusable components (Button, Input, Modal, Card)
├── context/      # AuthContext for global auth state
├── hooks/        # useAuth, useBooks
├── pages/        # Route-level page components
└── types/        # TypeScript interfaces
```

## Features

- JWT authentication (stored in localStorage)
- Protected routes — redirect to login if unauthenticated
- Book CRUD with detail pages
- User profile page
