"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { base } from "wagmi/chains";
import { CheckIcon, WalletIcon } from "@/components/icons";

export function WalletButton() {
  const { address, connector, isConnected } = useAccount();
  const { connectors, connectAsync, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeMenu(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  if (isConnected) {
    return (
      <div className="wallet-menu" ref={menuRef}>
        <button
          aria-expanded={isOpen}
          className="wallet-button connected"
          onClick={() => setIsOpen((value) => !value)}
          type="button"
        >
          <WalletIcon />
          <span>{shortAddress(address)}</span>
        </button>
        {isOpen ? (
          <div className="wallet-popover" role="menu">
            <div className="wallet-status">
              <CheckIcon />
              <span>{connector?.name ?? "Wallet"} connected</span>
            </div>
            <button
              className="wallet-option danger"
              onClick={() => {
                disconnect();
                setIsOpen(false);
              }}
              type="button"
            >
              Disconnect wallet
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="wallet-menu" ref={menuRef}>
      <button
        aria-expanded={isOpen}
        className="wallet-button"
        disabled={!connectors.length}
        onClick={() => {
          setErrorMessage("");
          setIsOpen((value) => !value);
        }}
        type="button"
      >
        <WalletIcon />
        <span>{isPending ? "Connecting" : "Connect Wallet"}</span>
      </button>
      {isOpen ? (
        <div className="wallet-popover" role="menu">
          {connectors.map((walletConnector) => (
            <button
              className="wallet-option"
              disabled={isPending}
              key={walletConnector.uid}
              onClick={async () => {
                setErrorMessage("");
                try {
                  await connectAsync({ chainId: base.id, connector: walletConnector });
                  setIsOpen(false);
                } catch (error) {
                  setErrorMessage(readableError(error));
                }
              }}
              type="button"
            >
              <span>{connectorLabel(walletConnector.name)}</span>
              <small>
                {isPending ? "Opening" : connectorHint(walletConnector.name)}
              </small>
            </button>
          ))}
          {errorMessage ? <p className="wallet-error">{errorMessage}</p> : null}
        </div>
      ) : null}
    </div>
  );
}

function shortAddress(address?: string) {
  if (!address) return "Connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function connectorLabel(name: string) {
  if (name.toLowerCase().includes("coinbase")) return "Coinbase Wallet";
  if (name.toLowerCase().includes("injected")) return "MetaMask / OKX / Base App";
  return name;
}

function connectorHint(name: string) {
  if (name.toLowerCase().includes("coinbase")) return "External wallet or Base smart wallet";
  return "Base App, MetaMask, OKX, and injected wallets";
}

function readableError(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Wallet did not respond. Open this app inside a wallet browser or choose Coinbase Wallet.";
}
