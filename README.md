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

## Planned v1.0 scope

Version 1.0 is planned to support creating, editing, deleting, and moving tasks
between the four workflow stages, with data stored in the browser through
`localStorage`.

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

The project is at S0 foundation. It includes the application shell, an empty
four-column board, build tooling, baseline tests, and continuous integration.

Task creation, editing, deletion, movement, persistence, filters, and
drag-and-drop are not implemented yet.
