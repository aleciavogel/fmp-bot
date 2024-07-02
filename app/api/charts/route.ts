import { NextRequest, NextResponse } from 'next/server'

import fmpClient from '@/vendors/fmp/client'
import { ChartsEndpoints } from '@/vendors/fmp/tools/charts/endpoints'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')
  const timeframe = searchParams.get('timeframe') || '5min'

  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 })
  }

  let endpoint = new Date()
  endpoint.setDate(endpoint.getDate() - 1)

  const today = new Date()

  try {
    const data = await fmpClient.request(ChartsEndpoints.Intraday, {
      symbol,
      timeframe,
      from: endpoint.toISOString().split('T')[0],
      to: today.toISOString().split('T')[0],
    })

    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching chart data:', error.message)
      return NextResponse.json({ error: error?.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
  }
}
