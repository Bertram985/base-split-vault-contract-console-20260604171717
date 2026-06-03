"use client";

import { PlusIcon } from "@/components/icons";

export type EditableExpense = {
  id: string;
  label: string;
  payer: string;
  amount: string;
};

export function ExpenseItemEditor({
  expenses,
  onChange,
}: {
  expenses: EditableExpense[];
  onChange: (expenses: EditableExpense[]) => void;
}) {
  function updateExpense(id: string, field: keyof EditableExpense, value: string) {
    onChange(
      expenses.map((expense) => (expense.id === id ? { ...expense, [field]: value } : expense)),
    );
  }

  function addExpense() {
    onChange([
      ...expenses,
      {
        id: crypto.randomUUID(),
        label: "",
        payer: "",
        amount: "",
      },
    ]);
  }

  return (
    <section className="builder-block expenses">
      <div className="builder-head">
        <span className="eyebrow">Expense Items</span>
        <button className="line-button compact" onClick={addExpense} type="button">
          <PlusIcon />
          Add
        </button>
      </div>
      <div className="editor-stack">
        {expenses.map((expense) => (
          <div className="expense-row" key={expense.id}>
            <input
              aria-label="Expense label"
              onChange={(event) => updateExpense(expense.id, "label", event.target.value)}
              placeholder="Expense label"
              value={expense.label}
            />
            <input
              aria-label="Paid by"
              onChange={(event) => updateExpense(expense.id, "payer", event.target.value)}
              placeholder="Paid by"
              value={expense.payer}
            />
            <input
              aria-label="Amount"
              inputMode="decimal"
              onChange={(event) => updateExpense(expense.id, "amount", event.target.value)}
              placeholder="Amount"
              value={expense.amount}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
