"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const queryClient = new QueryClient({})

export default function ReactQueryClientProviders({
  children,
}: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
