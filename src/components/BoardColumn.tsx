interface BoardColumnProps {
  title: string
  description: string
  accentClass: string
}

export function BoardColumn({
  title,
  description,
  accentClass,
}: BoardColumnProps) {
  return (
    <section
      aria-label={`${title} tasks`}
      className="flex min-h-72 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <header className="flex items-start gap-3 border-b border-slate-100 pb-4">
        <span
          aria-hidden="true"
          className={`mt-1.5 size-2.5 shrink-0 rounded-full ${accentClass}`}
        />
        <div>
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
        </div>
      </header>

      <div className="grid flex-1 place-items-center py-8 text-center">
        <p className="max-w-40 text-sm leading-6 text-slate-400">
          This stage is ready for tasks.
        </p>
      </div>
    </section>
  )
}
