import Link from "next/link";
import { TopTabs } from "@/components/TopTabs";
import { WalletButton } from "@/components/WalletButton";

export function VaultHeader() {
  return (
    <header className="vault-header">
      <Link className="brand-lockup" href="/">
        <span className="brand-mark">BSV</span>
        <span>
          <strong>base-split-vault</strong>
          <small>Settlement ledger</small>
        </span>
      </Link>
      <TopTabs />
      <WalletButton />
    </header>
  );
}
