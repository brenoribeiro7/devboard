export const workflowStages = [
  {
    id: 'backlog',
    title: 'Backlog',
    description: 'Ideas waiting to be prioritized.',
    accentClass: 'bg-violet-500',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    description: 'Work currently being developed.',
    accentClass: 'bg-blue-500',
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Changes waiting for a final check.',
    accentClass: 'bg-amber-500',
  },
  {
    id: 'done',
    title: 'Done',
    description: 'Completed development work.',
    accentClass: 'bg-emerald-500',
  },
] as const
