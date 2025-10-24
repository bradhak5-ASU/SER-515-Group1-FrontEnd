import React from "react";

export function TaskCard({ title, description }) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 space-y-2">
      <div className="text-xs font-semibold text-primary">{title}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
