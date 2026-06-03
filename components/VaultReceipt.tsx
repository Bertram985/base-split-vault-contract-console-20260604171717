"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { CopyHashButton } from "@/components/CopyHashButton";
import { SettlementRoute } from "@/components/SettlementRoute";
import { SettlementStatusChip } from "@/components/SettlementStatusChip";
import { CheckIcon } from "@/components/icons";
import { buildSettleVaultWrite, recordSettlementAction } from "@/lib/chain";
import type { Vault } from "@/lib/types";
import { useWriteContract } from "wagmi";

export function VaultReceipt({ vault }: { vault: Vault }) {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [state, setState] = useState<"ready" | "pending" | "settled">(
    vault.status === "settled" ? "settled" : "ready",
  );
  const [hash, setHash] = useState(vault.hash);

  async function settleBalance() {
    setState("pending");
    const request = buildSettleVaultWrite({ vaultId: vault.id });
    const txHash = request ? await writeContractAsync(request) : vault.hash;
    const result = await recordSettlementAction({
      address,
      txHash,
    });
    setHash(result.hash);
    setState("settled");
  }

  return (
    <article className="vault-receipt">
      <section className="receipt-top panel">
        <div>
          <span className="eyebrow">Vault Receipt</span>
          <h1>{vault.name}</h1>
          <p className="muted">Public split ledger updated {vault.updatedAt}</p>
        </div>
        <SettlementStatusChip status={state} />
      </section>

      <section className="member-balance-ledger panel">
        <div className="section-head">
          <span className="eyebrow">Member Balances</span>
          <h2 className="section-title">Paid vs Share</h2>
        </div>
        <div className="member-balance-head">
          <span>Member</span>
          <span>Paid</span>
          <span>Share</span>
          <span>Balance</span>
        </div>
        {vault.members.map((member) => {
          const balance = member.paid - member.share;
          return (
            <div className="member-balance-row" key={member.id}>
              <div>
                <strong>{member.name}</strong>
                <span>{member.wallet}</span>
              </div>
              <span className="amount">${member.paid.toFixed(2)}</span>
              <span className="amount">${member.share.toFixed(2)}</span>
              <strong className={balance >= 0 ? "credit amount" : "due amount"}>
                {balance >= 0 ? "+" : "-"}${Math.abs(balance).toFixed(2)}
              </strong>
            </div>
          );
        })}
      </section>

      <SettlementRoute vault={vault} />

      <section className="receipt-hash panel">
        <span className="eyebrow">Settlement Hash</span>
        <span className="hash">{hash}</span>
        <CopyHashButton value={hash} />
        <button className="primary-button" onClick={settleBalance} type="button">
          <CheckIcon />
          {state === "pending" ? "Settling" : "Settle Balance"}
        </button>
      </section>
    </article>
  );
}
