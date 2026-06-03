import type { SettlementStatus } from "@/lib/types";

export function SettlementStatusChip({ status }: { status: SettlementStatus }) {
  return <span className={`status-${status}`}>{status}</span>;
}
