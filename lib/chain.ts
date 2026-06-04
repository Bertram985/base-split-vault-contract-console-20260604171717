import type { Address, Hex } from "viem";
import { keccak256, toBytes } from "viem";
import { baseSplitVaultAbi } from "@/lib/baseSplitVaultAbi";
import {
  CONTRACT_ADDRESS,
  builderCodeSuffixConfig,
} from "@/lib/wagmi";

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

function buildVaultKey(parts: string[]) {
  return keccak256(toBytes(parts.join("|")));
}
