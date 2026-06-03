export type SettlementStatus = "ready" | "pending" | "settled" | "copied" | "recorded";

export type Member = {
  id: string;
  name: string;
  wallet: string;
  paid: number;
  share: number;
};

export type ExpenseItem = {
  id: string;
  label: string;
  payer: string;
  amount: number;
};

export type SettlementRecord = {
  id: string;
  vaultId: string;
  vaultName: string;
  payer: string;
  receiver: string;
  amount: number;
  status: SettlementStatus;
  time: string;
  hash: string;
};

export type Vault = {
  id: string;
  name: string;
  status: SettlementStatus;
  updatedAt: string;
  owner: string;
  members: Member[];
  expenses: ExpenseItem[];
  hash: string;
};
