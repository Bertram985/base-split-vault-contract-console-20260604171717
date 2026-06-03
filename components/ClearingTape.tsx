import Link from "next/link";
import { CopyHashButton } from "@/components/CopyHashButton";
import { SettlementStatusChip } from "@/components/SettlementStatusChip";
import type { SettlementRecord } from "@/lib/types";

export function ClearingTape({ records }: { records: SettlementRecord[] }) {
  return (
    <section className="clearing-tape">
      {records.map((record) => (
        <div className="tape-row" key={record.id}>
          <div className="tape-route">
            <strong>{record.payer}</strong>
            <span>to</span>
            <strong>{record.receiver}</strong>
          </div>
          <strong className="amount">${record.amount.toFixed(2)}</strong>
          <SettlementStatusChip status={record.status} />
          <span className="muted">{record.time}</span>
          <span className="hash">{record.hash}</span>
          <CopyHashButton value={record.hash} />
          <Link className="line-button compact" href={`/vault/${record.vaultId}`}>
            Detail
          </Link>
        </div>
      ))}
    </section>
  );
}
