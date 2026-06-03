import Link from "next/link";
import { ArrowIcon, PlusIcon } from "@/components/icons";

export function ActionBar() {
  return (
    <div className="action-bar">
      <Link className="primary-button" href="/create">
        <PlusIcon />
        Create Vault
      </Link>
      <Link className="ghost-button" href="/vaults">
        View My Vaults
        <ArrowIcon />
      </Link>
    </div>
  );
}
