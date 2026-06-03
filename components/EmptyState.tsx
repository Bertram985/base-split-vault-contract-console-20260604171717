export function EmptyState({ title, label }: { title: string; label: string }) {
  return (
    <div className="empty-state">
      <span className="eyebrow">{label}</span>
      <strong>{title}</strong>
    </div>
  );
}
