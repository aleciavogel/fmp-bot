export interface EarningsParams {
  earningsType: 'calendar' | 'confirmed' | 'historical' | 'surprises'
  symbol?: string
  from?: string
  to?: string
  limit?: number
}

interface CalendarItem {
  date: string
  symbol: string
  eps: number
  epsEstimated: number | null
  time: string
  revenue: number
  revenueEstimated: number | null
  fiscalDateEnding: string
  updatedFromDate: string
}

export type CalendarEarningsApiResponse = CalendarItem[]
export type HistoricalEarningsApiResponse = CalendarItem[]

interface ConfirmedEarningsEvent {
  symbol: string
  exchange: string
  time: string
  when: string
  date: string
  publicationDate: string
  title: string
  url: string
}

export type ConfirmedEarningsApiResponse = ConfirmedEarningsEvent[]

interface EarningsSurprise {
  date: string
  symbol: string
  actualEarningResult: number
  estimatedEarning: number
}

export type SurprisesEarningsApiResponse = EarningsSurprise[]
