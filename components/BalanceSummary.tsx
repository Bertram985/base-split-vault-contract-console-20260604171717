import { getVaultTotals } from "@/lib/mockData";
import type { Vault } from "@/lib/types";

export function BalanceSummary({ vault }: { vault: Vault }) {
  const { total, unsettled } = getVaultTotals(vault);
  const dueMembers = vault.members.filter((member) => member.paid - member.share < 0).length;

  return (
    <section className="balance-summary panel">
      <div>
        <span className="eyebrow">Balance Summary</span>
        <h2 className="amount">${unsettled.toFixed(2)}</h2>
        <p className="muted">unsettled across {dueMembers} member balances</p>
      </div>
      <div className="summary-grid">
        <div>
          <span>Total Recorded</span>
          <strong className="amount">${total.toFixed(2)}</strong>
        </div>
        <div>
          <span>Vault Status</span>
          <strong>{vault.status}</strong>
        </div>
        <div>
          <span>Members</span>
          <strong>{vault.members.length}</strong>
        </div>
      </div>
    </section>
  );
}
