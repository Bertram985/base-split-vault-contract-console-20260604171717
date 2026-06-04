"use client";

import { FormEvent, useMemo, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { MemberListEditor, type EditableMember } from "@/components/MemberListEditor";
import { CheckIcon } from "@/components/icons";
import { buildCreateVaultWrite } from "@/lib/chain";

const initialMembers: EditableMember[] = [
  { id: "m1", name: "Creator", wallet: "" },
];

export function VaultBuilder() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [vaultName, setVaultName] = useState("base-split-vault");
  const [members, setMembers] = useState(initialMembers);
  const [status, setStatus] = useState<"idle" | "recording" | "recorded" | "failed">("idle");
  const [txHash, setTxHash] = useState("");
  const vaultKeyInputs = useMemo(
    () => members.filter((member) => member.name || member.wallet).length + 1,
    [members],
  );

  async function submitVault(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("recording");
    setTxHash("");

    try {
      const request = buildCreateVaultWrite({
        labels: members.map((member) => member.name),
        memberAddresses: members.map((member) => member.wallet || address || ""),
        name: vaultName,
      });
      if (!request) throw new Error("Contract address is not configured.");
      const hash = await writeContractAsync(request);
      setTxHash(hash);
      setStatus("recorded");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <form className="vault-builder" onSubmit={submitVault}>
      <section className="builder-intake panel">
        <div>
          <span className="eyebrow">Vault Intake</span>
          <input
            aria-label="Vault name"
            className="vault-name-input"
            onChange={(event) => setVaultName(event.target.value)}
            placeholder="Vault name"
            value={vaultName}
          />
        </div>
        <div className="builder-metrics">
          <div>
            <span>Contract Function</span>
            <strong>createVault</strong>
          </div>
          <div>
            <span>Vault Key Inputs</span>
            <strong className="amount">{vaultKeyInputs}</strong>
          </div>
        </div>
      </section>

      <MemberListEditor members={members} onChange={setMembers} />

      <section className="builder-rule panel">
        <span className="eyebrow">Contract Write</span>
        <div className="rule-line">
          <CheckIcon />
          <span>Submits a bytes32 vault key to the deployed BaseSplitVault contract.</span>
        </div>
        <button className="primary-button" disabled={status === "recording"} type="submit">
          {status === "recording" ? "Creating Vault" : "Create Vault"}
        </button>
        {status === "recorded" ? <strong className="recorded-note">Vault recorded onchain</strong> : null}
        {status === "failed" ? <strong className="error-note">Transaction failed</strong> : null}
        {txHash ? <span className="hash">{txHash}</span> : null}
      </section>
    </form>
  );
}
