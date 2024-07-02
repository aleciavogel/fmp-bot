'use client'

import type { FC } from 'react'
import React from 'react'

interface SymbolCardProps {
  symbol: string | null
}

export const SymbolCard: FC<SymbolCardProps> = ({ symbol }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">{symbol}</h2>
    </div>
  )
}

export default SymbolCard
