import Link from "next/link";
import { VaultListPanel } from "@/components/VaultListPanel";
import { PlusIcon } from "@/components/icons";
import { vaults } from "@/lib/mockData";

export default function MyVaultsPage() {
  return (
    <main className="app-shell vaults-shell">
      <section className="archive-header">
        <div>
          <span className="eyebrow">My Vaults</span>
          <h1>Personal Settlement Archive</h1>
        </div>
        <Link className="primary-button" href="/create">
          <PlusIcon />
          Create Vault
        </Link>
      </section>
      <div className="archive-board">
        <VaultListPanel status="ready" title="Ready Lane" vaults={vaults} />
        <VaultListPanel status="pending" title="Pending Lane" vaults={vaults} />
        <VaultListPanel status="settled" title="Settled Lane" vaults={vaults} />
      </div>
    </main>
  );
}
