import type { Address, Hex } from "viem";
import { keccak256, toBytes } from "viem";
import { baseSplitVaultAbi } from "@/lib/baseSplitVaultAbi";
import {
  BASE_SPLIT_VAULT_APP_ID,
  BASE_SPLIT_VAULT_APP_NAME,
  CONTRACT_ADDRESS,
  builderCodeSuffixConfig,
} from "@/lib/wagmi";
import { trackTransaction } from "@/utils/track";

export type SettlementActionInput = {
  address?: string;
  txHash?: string;
};

type ContractWriteBase = {
  abi: typeof baseSplitVaultAbi;
  address: Address;
  dataSuffix: Hex;
};

export type CreateVaultWriteRequest = ContractWriteBase & {
  args: readonly [vaultKey: Hex];
  functionName: "createVault";
};

export type SettleVaultWriteRequest = ContractWriteBase & {
  args: readonly [vaultKey: Hex];
  functionName: "markVaultSettled";
};

export type ContractWriteRequest = CreateVaultWriteRequest | SettleVaultWriteRequest;

export async function recordSettlementAction({
  address,
  txHash,
}: SettlementActionInput) {
  const hash = txHash ?? mockHash();

  await trackTransaction(BASE_SPLIT_VAULT_APP_ID, BASE_SPLIT_VAULT_APP_NAME, address, hash);
  return {
    contractAddress: CONTRACT_ADDRESS,
    hash,
  };
}

export function buildCreateVaultWrite({
  labels,
  memberAddresses,
  name,
}: {
  labels: string[];
  memberAddresses: string[];
  name: string;
}): CreateVaultWriteRequest | undefined {
  if (!isConfiguredContract()) return undefined;

  const vaultKey = buildVaultKey([name, ...memberAddresses, ...labels]);

  return {
    abi: baseSplitVaultAbi,
    address: CONTRACT_ADDRESS,
    args: [vaultKey],
    dataSuffix: builderCodeSuffixConfig.builderCodeDataSuffix,
    functionName: "createVault",
  };
}

export function buildSettleVaultWrite({ vaultId }: { vaultId: string }): SettleVaultWriteRequest | undefined {
  if (!isConfiguredContract()) return undefined;

  return {
    abi: baseSplitVaultAbi,
    address: CONTRACT_ADDRESS,
    args: [buildVaultKey([vaultId])],
    dataSuffix: builderCodeSuffixConfig.builderCodeDataSuffix,
    functionName: "markVaultSettled",
  };
}

function isConfiguredContract() {
  return CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000";
}

function mockHash() {
  return `0x${Math.random().toString(16).slice(2).padEnd(64, "0").slice(0, 64)}` as Hex;
}

function buildVaultKey(parts: string[]) {
  return keccak256(toBytes(parts.join("|")));
}
