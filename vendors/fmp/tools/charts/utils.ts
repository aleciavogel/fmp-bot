export enum Timeframes {
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

export const fetchChart = async (symbol: string | null, timeframe = Timeframes.FiveMin) => {
  if (!symbol) {
    return null
  }

  const response = await fetch(`/api/charts?symbol=${symbol}&timeframe=${timeframe}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}
