"use client";

import { useState } from "react";
import { CopyIcon } from "@/components/icons";

export function CopyHashButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copyHash() {
    await navigator.clipboard?.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button className="copy-button" onClick={copyHash} title="Copy hash" type="button">
      <CopyIcon />
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
