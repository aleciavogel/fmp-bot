'use client'

import React, { useCallback, useState } from 'react'

import { Chat } from '@/components/chat'
import SymbolCard from '@/components/symbol-card' // Ensure this uses the shadcn version

const Home = () => {
  const [currentSymbol, setCurrentSymbol] = useState<string | null>(null)

  const handleNewSymbol = useCallback(
    (symbol: string) => {
      setCurrentSymbol(symbol)
    },
    [setCurrentSymbol],
  )

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex w-full h-screen">
        <div className="grid grid-cols-5 w-full h-full gap-6 py-10 px-8 bg-white">
          <div className="col-span-1">{currentSymbol && <SymbolCard symbol={currentSymbol} />}</div>
          <div className="h-full col-span-3">
            <Chat onSymbolChange={handleNewSymbol} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
