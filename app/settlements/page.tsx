import { ClearingTape } from "@/components/ClearingTape";
import { settlements } from "@/lib/mockData";

export default function SettlementsPage() {
  const cleared = settlements.filter((record) => record.status === "settled").length;

  return (
    <main className="app-shell settlements-shell">
      <section className="tape-header panel">
        <div>
          <span className="eyebrow">Settlements</span>
          <h1>Live Clearing Tape</h1>
        </div>
        <div className="tape-stats">
          <div>
            <span>Records</span>
            <strong>{settlements.length}</strong>
          </div>
          <div>
            <span>Cleared</span>
            <strong>{cleared}</strong>
          </div>
        </div>
      </section>
      <ClearingTape records={settlements} />
    </main>
  );
}
