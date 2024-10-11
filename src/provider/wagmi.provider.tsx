"use client";
import { http, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  const queryClient = new QueryClient();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
