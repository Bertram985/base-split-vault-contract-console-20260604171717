// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title BaseSplitVault
/// @notice Minimal proof registry for low-cost Base mini app attribution.
/// @dev The app keeps split details offchain; this contract emits compact events only.
contract BaseSplitVault {
    event VaultCreated(bytes32 indexed vaultKey, address indexed creator);
    event VaultSettled(bytes32 indexed vaultKey, address indexed settler);

    function createVault(bytes32 vaultKey) external {
        emit VaultCreated(vaultKey, msg.sender);
    }

    function markVaultSettled(bytes32 vaultKey) external {
        emit VaultSettled(vaultKey, msg.sender);
    }
}
