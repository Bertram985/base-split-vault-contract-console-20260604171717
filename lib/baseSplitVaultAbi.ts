export const baseSplitVaultAbi = [
  {
    type: "function",
    name: "createVault",
    stateMutability: "nonpayable",
    inputs: [{ name: "vaultKey", type: "bytes32" }],
    outputs: [],
  },
  {
    type: "function",
    name: "markVaultSettled",
    stateMutability: "nonpayable",
    inputs: [{ name: "vaultKey", type: "bytes32" }],
    outputs: [],
  },
  {
    type: "event",
    name: "VaultCreated",
    inputs: [
      { name: "vaultKey", type: "bytes32", indexed: true },
      { name: "creator", type: "address", indexed: true },
    ],
  },
  {
    type: "event",
    name: "VaultSettled",
    inputs: [
      { name: "vaultKey", type: "bytes32", indexed: true },
      { name: "settler", type: "address", indexed: true },
    ],
  },
] as const;
