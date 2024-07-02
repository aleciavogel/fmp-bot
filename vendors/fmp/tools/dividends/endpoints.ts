export enum DividendsEndpoints {
  Calendar = '/api/v3/stock_dividend_calendar',
  Historical = '/api/v3/historical-price-full/stock_dividend/{symbol}', // TODO: move to some sort of historical price namespace
}
