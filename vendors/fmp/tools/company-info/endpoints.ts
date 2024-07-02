export enum CompanyInfoEndpoints {
  // AllSharesFloat = '/api/v4/shares_float/all', -> moved to _list
  AnalystEstimates = '/api/v3/analyst-estimates',
  AnalystStockRecommendations = '/api/v3/analyst-stock-recommendations',
  CompanyLogo = '/image-stock/{symbol}.png',
  CompanyNotes = '/api/v4/company-notes',
  CompanyOutlook = '/api/v4/company-outlook',
  // CountryList = '/api/v3/get-all-countries', -> moved to _list
  // DelistedCompanies = '/api/v3/delisted-companies', -> moved to _list
  EmployeeCount = '/api/v4/employee_count',
  // ExchangesList = '/api/v3/exchanges-list', -> moved to _list
  ExecutiveCompensation = '/api/v4/governance/executive_compensation',
  ExecutiveCompensationBenchmark = '/api/v4/executive-compensation-benchmark',
  HistoricalEmployeeCount = '/api/v4/historical/employee_count',
  HistoricalMarketCap = '/api/v3/historical-market-capitalization/{symbol}',
  HistoricalSharesFloat = '/api/v4/historical/shares_float',
  // IndustriesList = '/api/v3/industries-list', -> moved to _list
  // IsMarketOpen = '/api/v3/is-the-market-open', -> moved to _misc
  Profile = '/api/v3/profile/{symbol}',
  // SectorsList = '/api/v3/sectors-list', -> moved to _list
  SharesFloat = '/api/v4/shares_float',
  StockPeers = '/api/v4/stock_peers',
}
