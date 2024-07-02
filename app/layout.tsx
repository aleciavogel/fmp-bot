import React, { type ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Providers from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'

import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FMP Chat',
  description: 'An AI-powered chat interface for interacting with the FMP API',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
