import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/AppProviders";
import { VaultHeader } from "@/components/VaultHeader";

export const metadata: Metadata = {
  title: "base-split-vault",
  description: "Shared expense split and settlement tool for Base wallets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="6a1fda064fbf682eb25dc0be" />
        <meta
          name="talentapp:project_verification"
          content="REPLACE_WITH_TALENT_VERIFICATION_HASH"
        />
      </head>
      <body>
        <AppProviders>
          <VaultHeader />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
