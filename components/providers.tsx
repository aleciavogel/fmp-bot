'use client'

import type { FC, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default Providers
