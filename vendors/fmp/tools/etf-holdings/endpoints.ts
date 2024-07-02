export enum EtfHoldingsEndpoints {
  CountryWeightings = '/api/v3/etf-country-weightings',
  Holder = '/api/v3/etf-holder/{symbol}',
  Holdings = '/api/v4/etf-holdings',
  Info = '/api/v4/etf-info',
  SectorWeightings = '/api/v3/etf-sector-weightings/{symbol}',
  StockExposure = '/api/v3/etf-stock-exposure/{symbol}',
  UpdateDates = '/api/v4/etf-holdings/portfolio-date',
}
