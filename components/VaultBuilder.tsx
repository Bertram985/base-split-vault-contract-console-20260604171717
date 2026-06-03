"use client";

import { FormEvent, useMemo, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { ExpenseItemEditor, type EditableExpense } from "@/components/ExpenseItemEditor";
import { MemberListEditor, type EditableMember } from "@/components/MemberListEditor";
import { SplitMethodControl } from "@/components/SplitMethodControl";
import { CheckIcon } from "@/components/icons";
import { buildCreateVaultWrite, recordSettlementAction } from "@/lib/chain";

const initialMembers: EditableMember[] = [
  { id: "m1", name: "Avery", wallet: "0xA11c...09F2" },
  { id: "m2", name: "Blake", wallet: "0xB71e...55C0" },
  { id: "m3", name: "Casey", wallet: "0xC45e...83D1" },
];

const initialExpenses: EditableExpense[] = [
  { id: "e1", label: "Dinner receipt", payer: "Avery", amount: "180" },
  { id: "e2", label: "Ride share", payer: "Casey", amount: "55" },
];

export function VaultBuilder() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [vaultName, setVaultName] = useState("Neighborhood Split");
  const [members, setMembers] = useState(initialMembers);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [method, setMethod] = useState("Equal Split");
  const [status, setStatus] = useState<"idle" | "recording" | "recorded">("idle");
  const totalAmount = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    [expenses],
  );
  const perMember = members.length ? totalAmount / members.length : 0;

  async function submitVault(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("recording");
    const request = buildCreateVaultWrite({
      labels: members.map((member) => member.name),
      memberAddresses: members.map((member) => member.wallet),
      name: vaultName,
    });
    const txHash = request ? await writeContractAsync(request) : undefined;
    const result = await recordSettlementAction({
      address,
      txHash,
    });
    setStatus("recorded");
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
        <SplitMethodControl onChange={setMethod} value={method} />
        <div className="builder-metrics">
          <div>
            <span>Total</span>
            <strong className="amount">${totalAmount.toFixed(2)}</strong>
          </div>
          <div>
            <span>Per Member</span>
            <strong className="amount">${perMember.toFixed(2)}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{status === "idle" ? "ready" : status}</strong>
          </div>
        </div>
      </section>

      <div className="builder-grid">
        <MemberListEditor members={members} onChange={setMembers} />
        <ExpenseItemEditor expenses={expenses} onChange={setExpenses} />
      </div>

      <section className="builder-rule panel">
        <span className="eyebrow">One Wallet Settlement Action</span>
        <div className="rule-line">
          <CheckIcon />
          <span>One connected wallet can save the vault, unlock a clear split preview, and copy the settlement hash.</span>
        </div>
        <button className="primary-button" disabled={status === "recording"} type="submit">
          {status === "recording" ? "Creating Vault" : "Create Vault"}
        </button>
        {status === "recorded" ? <strong className="recorded-note">Vault recorded</strong> : null}
      </section>
    </form>
  );
}
