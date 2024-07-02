'use client'

import React, { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'

import { Chat } from '@/components/chat'

const DynamicSymbolCard = dynamic(() => import('@/components/symbol-card'), {
  loading: () => <p>Loading...</p>,
})

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
        <div className="grid grid-cols-12 w-full h-full gap-6 py-10 px-4 md:px-8 bg-blue-100">
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
            {currentSymbol && <DynamicSymbolCard symbol={currentSymbol} />}
          </div>
          <div className="h-full col-span-12 lg:col-span-8 xl:col-span-7 overflow-hidden rounded shadow-lg">
            <Chat onSymbolChange={handleNewSymbol} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
