import Link from "next/link";
import { BalanceSummary } from "@/components/BalanceSummary";
import { VaultReceipt } from "@/components/VaultReceipt";
import { getVault } from "@/lib/mockData";

export default async function VaultDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const vault = getVault(id);

  return (
    <main className="app-shell receipt-shell">
      <div className="receipt-layout">
        <aside className="receipt-aside">
          <Link className="line-button" href="/vaults">
            Back to Vaults
          </Link>
          <BalanceSummary vault={vault} />
          <section className="expense-rail panel">
            <span className="eyebrow">Expense Rail</span>
            {vault.expenses.map((expense) => (
              <div className="expense-line" key={expense.id}>
                <span>{expense.label}</span>
                <strong className="amount">${expense.amount.toFixed(2)}</strong>
              </div>
            ))}
          </section>
        </aside>
        <VaultReceipt vault={vault} />
      </div>
    </main>
  );
}
