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
          content="9437c2dd971b17caa0c2146a606a10d180e70704dc29753a239a2ad82752e87bc5ff1b830ff5b3827659a81d1ea7bb63022d0fadc061114c6ca1d34722aa9d75"
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
