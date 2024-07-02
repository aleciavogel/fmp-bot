// Keeping endpoints in case I want to transform them later
// TODO: check if company has ever been in one of these lists
// TODO: get top 10 oldest companies
// TODO: get top 10 newest companies on the list

export enum ConstituentsEndpoints {
  Dowjones = '/api/v3/dowjones_constituent',
  HistoricalDowjones = '/api/v3/historical/dowjones_constituent',
  Nasdaq = '/api/v3/nasdaq_constituent',
  HistoricalNasdaq = '/api/v3/historical/nasdaq_constituent',
  Sp500 = '/api/v3/sp500_constituent',
  HistoricalSp500 = '/api/v3/historical/sp500_constituent',
}
