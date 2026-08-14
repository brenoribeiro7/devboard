# DevBoard

DevBoard is a small, local-first task board for personal development work. It
keeps tasks visible across Backlog, In Progress, Review, and Done.

## Problem

Personal development tasks are often scattered across notes and tools, making
it difficult to see what needs attention and what is already complete. DevBoard
provides one focused workflow that runs entirely in the browser.

## Features

- Four fixed workflow columns with per-column task counts
- Task creation with a required title, optional description, and priority
- Task editing with a cancel option
- Low, medium, and high priorities shown with text and color
- Task movement between any workflow states
- Deletion with confirmation
- Responsive, keyboard-accessible controls
- Safe restoration from browser storage

## Stack

- React and TypeScript
- Vite and Tailwind CSS
- Vitest, React Testing Library, and jsdom
- ESLint
- pnpm
- GitHub Actions

## Getting Started

Prerequisites: Node.js 22.23.1 or a compatible release, and pnpm 11.21.0.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Vite serves the application at `http://localhost:5173` by default.

## Development

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm check
```

`pnpm check` runs linting, type checking, tests, and the production build.

## Persistence

Tasks are stored under `devboard.tasks.v1` in the current browser profile's
`localStorage`. Data is not synchronized between browsers or devices, and
browser storage can be cleared by the user or browser. Do not use DevBoard to
store sensitive data.

Missing, corrupted, incompatible, or unavailable storage degrades safely to an
empty or session-only board.

## Testing

The automated suite covers task creation, validation, editing, movement,
deletion, timestamps, column counts, persistence, restoration, invalid stored
data, and unavailable storage.

## Current limitations

Version 1.0 has no backend, accounts, authentication, cloud synchronization, or
collaboration. Drag-and-drop, search, filters, custom columns, due dates, and
other advanced task features are outside its scope.
