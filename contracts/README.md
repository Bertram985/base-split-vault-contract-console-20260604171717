# BaseSplitVault Contract

`BaseSplitVault.sol` is a minimal proof registry for a low-cost Base mini app.

Onchain functions:

- `createVault(bytes32 vaultKey)` emits a compact vault creation proof.
- `markVaultSettled(bytes32 vaultKey)` emits a compact settlement proof.

All split details, member labels, balances, and reward display stay in the app/offchain layer. This keeps deployment bytecode and transaction calldata small so Base mainnet deployment can stay close to a tiny budget.

Replace `CONTRACT_ADDRESS` in `lib/wagmi.ts` after deployment.
