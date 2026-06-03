import Link from "next/link";
import { SettlementStatusChip } from "@/components/SettlementStatusChip";
import { getVaultTotals } from "@/lib/mockData";
import type { SettlementStatus, Vault } from "@/lib/types";

export function VaultListPanel({
  title,
  status,
  vaults,
}: {
  title: string;
  status: SettlementStatus;
  vaults: Vault[];
}) {
  const filtered = vaults.filter((vault) => vault.status === status);

  return (
    <section className="archive-lane">
      <div className="lane-head">
        <h2>{title}</h2>
        <SettlementStatusChip status={status} />
      </div>
      {filtered.map((vault) => {
        const { unsettled } = getVaultTotals(vault);
        return (
          <Link className="archive-record" href={`/vault/${vault.id}`} key={vault.id}>
            <div>
              <strong>{vault.name}</strong>
              <span>{vault.updatedAt}</span>
            </div>
            <strong className="amount">${unsettled.toFixed(2)}</strong>
          </Link>
        );
      })}
    </section>
  );
}
