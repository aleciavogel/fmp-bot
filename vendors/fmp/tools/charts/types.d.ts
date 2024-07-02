export interface IntradayData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface StockData {
  symbol: string
  historical: HistoricalData[]
}
