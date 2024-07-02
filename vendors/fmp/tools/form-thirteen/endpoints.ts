export enum FormThirteenEndpoints {
  AssetAllocation = '/api/v4/13f-asset-allocation',
  AssetAllocationDates = '/api/v4/13f-asset-allocation-date',
  Dates = '/api/v3/form-thirteen-date/{cik}',
  IndustryOwnershipSummary = '/api/v4/institutional-ownership/industry/portfolio-holdings-summary',
  InstitutionalHolder = '/api/v3/institutional-holder/{symbol}',
  InstitutionalOwnershipList = '/api/v4/institutional-ownership/list', // TODO: move to _lists
  InstitutionalStockOwnership = '/api/v4/institutional-ownership/symbol-ownership',
  PortfolioComposition = '/api/v4/institutional-ownership/portfolio-holdings',
  PortfolioHoldingsDates = '/api/v4/institutional-ownership/portfolio-date',
  PortfolioHoldingsSummary = '/api/v4/institutional-ownership/portfolio-holdings-summary',
  QuarterlyReports = '/api/v3/form-thirteen/{cik}',
  RealtimeInstitutionalOwnership = '/api/v4/institutional-ownership/rss_feed',
  SearchInstitutionalHolders = '/api/v4/institutional-ownership/name', // TODO: move to search?
  StockOwnershipByHolders = '/api/v4/institutional-ownership/institutional-holders/symbol-ownership-percent',
}
