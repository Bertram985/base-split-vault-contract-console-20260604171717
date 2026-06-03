import Link from "next/link";
import { vaults } from "@/lib/mockData";
import { SettlementStatusChip } from "@/components/SettlementStatusChip";

export function VaultSideRail() {
  return (
    <aside className="side-rail panel">
      <span className="eyebrow">Vault Rail</span>
      <div className="rail-list">
        {vaults.map((vault) => (
          <Link className="rail-item" href={`/vault/${vault.id}`} key={vault.id}>
            <strong>{vault.name}</strong>
            <span>{vault.updatedAt}</span>
            <SettlementStatusChip status={vault.status} />
          </Link>
        ))}
      </div>
    </aside>
  );
}
