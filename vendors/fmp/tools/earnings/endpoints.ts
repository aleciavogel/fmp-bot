export enum EarningsEndpoints {
  Calendar = '/api/v3/earnings_calendar', // TODO: move to some sort of calendar namespace
  Confirmed = '/api/v4/earning-calendar-confirmed', // TODO: move to some sort of calendar namespace
  Historical = '/api/v3/historical/earning_calendar', // TODO: move to a historical calendar namespace?
  Surprises = '/api/v3/earnings-surprises/{symbol}',
}
