"use client";
import { http, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";

const config = getDefaultConfig({
  appName: "Onentry",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});

const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
