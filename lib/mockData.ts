import type { SettlementRecord, Vault } from "@/lib/types";

export const vaults: Vault[] = [
  {
    id: "harbor-team",
    name: "Harbor Team Dinner",
    status: "pending",
    updatedAt: "2026-06-01 21:18",
    owner: "0x89A1...1024",
    hash: "0xa85f1c20d70472d1147a1d45f6b1b7068e916a4c1b8d1c94439fe1712d81876a",
    members: [
      { id: "m1", name: "Avery", wallet: "0xA11c...09F2", paid: 180, share: 91.25 },
      { id: "m2", name: "Blake", wallet: "0xB71e...55C0", paid: 0, share: 91.25 },
      { id: "m3", name: "Casey", wallet: "0xC45e...83D1", paid: 95, share: 91.25 },
      { id: "m4", name: "Drew", wallet: "0xD68f...72AA", paid: 90, share: 91.25 },
    ],
    expenses: [
      { id: "e1", label: "Dinner receipt", payer: "Avery", amount: 180 },
      { id: "e2", label: "Ride share", payer: "Casey", amount: 55 },
      { id: "e3", label: "Venue deposit", payer: "Drew", amount: 90 },
      { id: "e4", label: "Snacks", payer: "Casey", amount: 40 },
    ],
  },
  {
    id: "builder-weekend",
    name: "Builder Weekend",
    status: "ready",
    updatedAt: "2026-05-29 18:04",
    owner: "0x31Ba...76E0",
    hash: "0x79d008f69ec05b81dd95f1a7a73097a75e22aab5f14904410d8d7036c502fb41",
    members: [
      { id: "m1", name: "Morgan", wallet: "0x472A...190B", paid: 420, share: 235 },
      { id: "m2", name: "Riley", wallet: "0x875d...721F", paid: 160, share: 235 },
      { id: "m3", name: "Taylor", wallet: "0x536B...8F13", paid: 125, share: 235 },
    ],
    expenses: [
      { id: "e1", label: "Workspace", payer: "Morgan", amount: 330 },
      { id: "e2", label: "Catering", payer: "Riley", amount: 160 },
      { id: "e3", label: "Demo gear", payer: "Morgan", amount: 90 },
      { id: "e4", label: "Transport", payer: "Taylor", amount: 125 },
    ],
  },
  {
    id: "studio-crew",
    name: "Studio Crew Supplies",
    status: "settled",
    updatedAt: "2026-05-24 12:44",
    owner: "0xEE42...16A8",
    hash: "0x4fc7ee2622c81f82f5086a4c7f128ee490c1b18e0907c069249f5b979dcffdd2",
    members: [
      { id: "m1", name: "Jordan", wallet: "0x786C...0AC9", paid: 210, share: 210 },
      { id: "m2", name: "Quinn", wallet: "0x449F...79BD", paid: 210, share: 210 },
    ],
    expenses: [
      { id: "e1", label: "Lighting kit", payer: "Jordan", amount: 280 },
      { id: "e2", label: "Props", payer: "Quinn", amount: 140 },
    ],
  },
];

export const settlements: SettlementRecord[] = [
  {
    id: "s1",
    vaultId: "harbor-team",
    vaultName: "Harbor Team Dinner",
    payer: "Blake",
    receiver: "Avery",
    amount: 91.25,
    status: "pending",
    time: "4 min ago",
    hash: "0xa85f1c20d70472d1147a1d45f6b1b7068e916a4c1b8d1c94439fe1712d81876a",
  },
  {
    id: "s2",
    vaultId: "builder-weekend",
    vaultName: "Builder Weekend",
    payer: "Taylor",
    receiver: "Morgan",
    amount: 110,
    status: "ready",
    time: "31 min ago",
    hash: "0x79d008f69ec05b81dd95f1a7a73097a75e22aab5f14904410d8d7036c502fb41",
  },
  {
    id: "s3",
    vaultId: "studio-crew",
    vaultName: "Studio Crew Supplies",
    payer: "Quinn",
    receiver: "Jordan",
    amount: 70,
    status: "settled",
    time: "2 days ago",
    hash: "0x4fc7ee2622c81f82f5086a4c7f128ee490c1b18e0907c069249f5b979dcffdd2",
  },
];

export function getVault(id: string) {
  return vaults.find((vault) => vault.id === id) ?? vaults[0];
}

export function getVaultTotals(vault: Vault) {
  const total = vault.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const unsettled = vault.members.reduce((sum, member) => {
    const balance = member.paid - member.share;
    return balance < 0 ? sum + Math.abs(balance) : sum;
  }, 0);

  return { total, unsettled };
}
