import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import ReactAppQueryProvider from "@/provider/reactquery.provider";
import Web3Provider from "@/provider/wagmi.provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Onentry",
  description: "Your Web3 Profile, Everywhere",
};

const bricolage_grotesque = Bricolage_Grotesque({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
});
const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactAppQueryProvider>
        <Web3Provider>
          <body
            className={`${bricolage_grotesque.variable} ${plus_jakarta_sans.variable}`}
          >
            {children}
          </body>
          <Toaster position="bottom-right" />
        </Web3Provider>
      </ReactAppQueryProvider>
    </html>
  );
}
