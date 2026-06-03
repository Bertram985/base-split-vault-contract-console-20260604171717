import type { Vault } from "@/lib/types";

export function SettlementRoute({ vault }: { vault: Vault }) {
  const creditors = vault.members
    .map((member) => ({ ...member, balance: member.paid - member.share }))
    .filter((member) => member.balance > 0)
    .sort((a, b) => b.balance - a.balance);
  const debtors = vault.members
    .map((member) => ({ ...member, balance: member.paid - member.share }))
    .filter((member) => member.balance < 0)
    .sort((a, b) => a.balance - b.balance);
  const routes = debtors.map((debtor, index) => ({
    payer: debtor.name,
    receiver: creditors[index % Math.max(creditors.length, 1)]?.name ?? "Vault",
    amount: Math.abs(debtor.balance),
  }));

  return (
    <section className="settlement-route panel">
      <div className="section-head">
        <span className="eyebrow">Settlement Route</span>
        <h2 className="section-title">Who Owes Whom</h2>
      </div>
      <div className="route-stack">
        {routes.map((route) => (
          <div className="route-line" key={`${route.payer}-${route.receiver}`}>
            <span>{route.payer}</span>
            <span className="route-rail" />
            <strong className="amount">${route.amount.toFixed(2)}</strong>
            <span className="route-rail" />
            <span>{route.receiver}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
