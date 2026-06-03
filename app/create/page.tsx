import { VaultBuilder } from "@/components/VaultBuilder";

export default function CreateVaultPage() {
  return (
    <main className="app-shell create-shell">
      <section className="create-heading">
        <span className="eyebrow">Create Vault</span>
        <h1>Group Settlement Builder</h1>
      </section>
      <VaultBuilder />
    </main>
  );
}
