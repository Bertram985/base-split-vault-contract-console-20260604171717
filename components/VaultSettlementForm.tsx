"use client";

import { FormEvent, useState } from "react";
import { useWriteContract } from "wagmi";
import { CheckIcon } from "@/components/icons";
import { buildSettleVaultWrite } from "@/lib/chain";

export function VaultSettlementForm() {
  const { writeContractAsync } = useWriteContract();
  const [vaultId, setVaultId] = useState("");
  const [status, setStatus] = useState<"idle" | "settling" | "settled" | "failed">("idle");
  const [txHash, setTxHash] = useState("");

  async function settleVault(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("settling");
    setTxHash("");

    try {
      const request = buildSettleVaultWrite({ vaultId });
      if (!request) throw new Error("Contract address is not configured.");
      const hash = await writeContractAsync(request);
      setTxHash(hash);
      setStatus("settled");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <form className="vault-builder" onSubmit={settleVault}>
      <section className="builder-intake panel">
        <div>
          <span className="eyebrow">Settle Vault</span>
          <input
            aria-label="Vault id"
            className="vault-name-input"
            onChange={(event) => setVaultId(event.target.value)}
            placeholder="Vault id"
            required
            value={vaultId}
          />
        </div>
        <div className="builder-metrics">
          <div>
            <span>Contract Function</span>
            <strong>markVaultSettled</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{status === "idle" ? "ready" : status}</strong>
          </div>
        </div>
      </section>

      <section className="builder-rule panel">
        <span className="eyebrow">Contract Write</span>
        <div className="rule-line">
          <CheckIcon />
          <span>Hashes the vault id into a bytes32 key and marks that vault as settled onchain.</span>
        </div>
        <button className="primary-button" disabled={status === "settling"} type="submit">
          {status === "settling" ? "Settling Vault" : "Settle Vault"}
        </button>
        {status === "settled" ? <strong className="recorded-note">Vault settled onchain</strong> : null}
        {status === "failed" ? <strong className="error-note">Transaction failed</strong> : null}
        {txHash ? <span className="hash">{txHash}</span> : null}
      </section>
    </form>
  );
}
