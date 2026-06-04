import { VaultBuilder } from "@/components/VaultBuilder";
import { VaultSettlementForm } from "@/components/VaultSettlementForm";

export default function HomePage() {
  return (
    <main className="app-shell contract-shell">
      <section className="contract-heading">
        <span className="eyebrow">Contract Console</span>
        <h1>Base Split Vault</h1>
      </section>
      <div className="contract-grid">
        <VaultBuilder />
        <VaultSettlementForm />
      </div>
    </main>
  );
}
