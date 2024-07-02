// Removing for now, as too many tokens are required and idk enough
// to know if a user needs to be able to pull specific data from
// these endpoints

export enum StockListEndpoints {
  AvailableEuronextSymbols = '/api/v3/symbol/available-euronext',
  AvailableIndexes = '/api/v3/symbol/available-indexes',
  AvailableTradedList = '/api/v3/available-traded/list',
  CikList = '/api/v3/cik_list',
  CommitmentOfTradersReportList = '/api/v4/commitment_of_traders_report/list',
  EtfList = '/api/v3/etf/list',
  ExchangeSymbols = '/api/v3/symbol/{exchange}',
  FinancialStatementSymbolLists = '/api/v3/financial-statement-symbol-lists',
  StockList = '/api/v3/stock/list',
  SymbolChanges = '/api/v4/symbol_change',
}
