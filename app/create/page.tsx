import { VaultBuilder } from "@/components/VaultBuilder";

export default function CreateVaultPage() {
  return (
    <main className="app-shell create-shell">
      <section className="contract-heading">
        <span className="eyebrow">Create Vault</span>
        <h1>Contract Vault Builder</h1>
      </section>
      <VaultBuilder />
    </main>
  );
}
