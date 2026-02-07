"use client";

export default function ClickHistory({ history }) {
  if (history.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-md">
      <h3 className="mb-3 text-center text-sm font-medium text-muted-foreground">
        Marcos alcancados
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {history.map((item) => (
          <span
            key={item.value}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{
              backgroundColor: `${item.color}20`,
              color: item.color,
              border: `1px solid ${item.color}40`,
            }}
          >
            {item.icon} {item.value}
          </span>
        ))}
      </div>
    </div>
  );
}
