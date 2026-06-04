"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Contract" },
  { href: "/create", label: "Create" },
];

export function TopTabs() {
  const pathname = usePathname();

  return (
    <nav className="top-tabs" aria-label="Main navigation">
      {tabs.map((tab) => {
        const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        return (
          <Link className={active ? "top-tab active" : "top-tab"} href={tab.href} key={tab.href}>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
