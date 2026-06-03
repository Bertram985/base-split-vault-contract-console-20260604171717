import Link from "next/link";
import { ActionBar } from "@/components/ActionBar";
import { BalanceSummary } from "@/components/BalanceSummary";
import { ClearingTape } from "@/components/ClearingTape";
import { SettlementStatusChip } from "@/components/SettlementStatusChip";
import { VaultSideRail } from "@/components/VaultSideRail";
import { getVaultTotals, settlements, vaults } from "@/lib/mockData";

export default function HomePage() {
  const activeVaults = vaults.filter((vault) => vault.status !== "settled");
  const totalUnsettled = vaults.reduce((sum, vault) => sum + getVaultTotals(vault).unsettled, 0);
  const highestPending = activeVaults
    .map((vault) => ({ vault, unsettled: getVaultTotals(vault).unsettled }))
    .sort((a, b) => b.unsettled - a.unsettled)[0];

  return (
    <main className="app-shell">
      <div className="desk-grid">
        <VaultSideRail />
        <section className="desk-main">
          <div className="desk-kicker">
            <span className="eyebrow">Vault Desk</span>
            <SettlementStatusChip status="ready" />
          </div>
          <div className="desk-total panel">
            <div>
              <span>Instant Split Reward</span>
              <h1 className="amount">${totalUnsettled.toFixed(2)}</h1>
              <p className="muted">Connect a wallet or create a vault to see value cleared on the first action.</p>
            </div>
            <div className="desk-count">
              <strong>{activeVaults.length}</strong>
              <span>active vaults</span>
            </div>
          </div>
          <section className="reward-strip">
            <div className="reward-tile panel">
              <span className="eyebrow">Zero Token Purchase</span>
              <strong>$0 entry</strong>
            </div>
            <div className="reward-tile panel">
              <span className="eyebrow">First Tap Reward</span>
              <strong>Split preview</strong>
            </div>
          </section>
          <ActionBar />
          <section className="pending-slab panel">
            <span className="eyebrow">Highest Pending Balance</span>
            <Link href={`/vault/${highestPending.vault.id}`}>
              <strong>{highestPending.vault.name}</strong>
              <span className="amount">${highestPending.unsettled.toFixed(2)}</span>
            </Link>
          </section>
          <section className="recent-strip panel">
            <div className="section-head">
              <span className="eyebrow">Recent Settlement</span>
              <h2 className="section-title">Clearing Activity</h2>
            </div>
            <ClearingTape records={settlements.slice(0, 2)} />
          </section>
        </section>
        <aside className="desk-summary">
          <BalanceSummary vault={vaults[0]} />
          <section className="public-summary panel">
            <span className="eyebrow">Public Summary</span>
            <div className="summary-line">
              <span>Wallet vaults</span>
              <strong>{vaults.length}</strong>
            </div>
            <div className="summary-line">
              <span>Recorded hashes</span>
              <strong>{settlements.length}</strong>
            </div>
            <div className="summary-line">
              <span>Next action</span>
              <strong>Settle Blake</strong>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
