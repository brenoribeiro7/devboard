# DevBoard

DevBoard is a small frontend application for keeping personal development tasks
organized across four stages: Backlog, In Progress, Review, and Done.

## Objective

The project aims to provide a focused local workspace for following development
work from an initial idea through completion.

## Stack

- React and TypeScript
- Vite
- Tailwind CSS
- Vitest, React Testing Library, and jsdom
- ESLint
- pnpm
- GitHub Actions

## Features

- Create tasks with a title, optional description, and priority
- Edit task details or cancel an edit without changing the task
- Move tasks between Backlog, In Progress, Review, and Done
- Delete tasks after confirmation
- Track task counts in each fixed workflow stage
- Restore the board from browser `localStorage`

Stored data is validated before use. Missing, corrupted, incompatible, or
unavailable browser storage falls back to a safe empty or session-only board.

## Local development

Requirements: Node.js 22.23.1 or a compatible release, and pnpm 11.12.0.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Validation

Run all local quality gates:

```bash
pnpm check
```

Individual commands are also available:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Current status

The core v1.0 task workflow is implemented locally. The project includes unit
tests for state and persistence, interface tests for the main user flows, build
tooling, and a GitHub Actions workflow for continuous integration.

## Limitations

Data remains in the current browser and is not synchronized between devices.
Drag-and-drop, search, filters, custom columns, due dates, accounts, and cloud
sync are outside the v1.0 scope.
