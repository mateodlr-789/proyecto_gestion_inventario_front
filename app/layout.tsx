import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ProviderQuery from "./_providers/provider-query";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import ProviderSession from "./_providers/provider-session";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ProviderAuth from "./_providers/provider-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Principal",
  description: "Principal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderQuery>
          <ProviderSession >
            <ProviderAuth>
              {children}
            </ProviderAuth>
            <Toaster />
          </ProviderSession>
        </ProviderQuery>
      </body>
    </html>
  );
}
