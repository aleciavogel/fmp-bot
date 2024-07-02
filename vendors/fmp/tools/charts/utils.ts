import fmpClient from '@/vendors/fmp/client'
import { ChartsEndpoints } from '@/vendors/fmp/tools/charts/endpoints'
import { IntradayData } from '@/vendors/fmp/tools/charts/types'

enum Timeframes {
  OneMin = '1min',
  FiveMin = '5min',
  FifteenMin = '15min',
  ThirtyMin = '30min',
  OneHour = '1hour',
  FourHour = '4hour',
  OneDay = '1day',
  OneWeek = '1week',
  OneMonth = '1month',
}

export const fetchChart = async (
  symbol: string | null,
  timeframe: Timeframes = Timeframes.FiveMin,
): Promise<IntradayData[] | null> => {
  if (!symbol) {
    return null
  }

  let endpoint = new Date()
  endpoint.setDate(endpoint.getDate() - 1)

  return await fmpClient.request(ChartsEndpoints.Intraday, {
    symbol,
    timeframe,
    from: endpoint.toISOString().split('T')[0],
  })
}
