"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ReactAppQueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactAppQueryProvider;