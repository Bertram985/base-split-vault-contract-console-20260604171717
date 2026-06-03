"use client";

const methods = ["Equal Split", "Paid Weighted", "Manual Route"];

export function SplitMethodControl({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="segmented-control" role="tablist" aria-label="Split method">
      {methods.map((method) => (
        <button
          className={value === method ? "segment active" : "segment"}
          key={method}
          onClick={() => onChange(method)}
          type="button"
        >
          {method}
        </button>
      ))}
    </div>
  );
}
