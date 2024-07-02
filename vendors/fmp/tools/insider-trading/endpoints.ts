export enum InsiderTradingEndpoints {
  // AllCiks = '/api/v4/mapper-cik-company/{symbol}', // TODO: move to lists
  BeneficialOwnership = '/api/v4/insider/ownership/acquisition_of_beneficial_ownership',
  BySymbol = '/api/v4/insider-roaster', // TODO: move to company info?
  CiksMappedToSymbols = '/api/v4/mapper-cik-name', // TODO: move to lists
  FailToDeliver = '/api/v4/fail_to_deliver',
  Realtime = '/api/v4/insider-trading-rss-feed',
  Search = '/api/v4/insider-trading',
  SearchCik = '/api/v4/mapper-cik-name', // TODO: move elsewhere...
  Statistics = '/api/v4/insider-roaster-statistics',
  TransactionTypes = '/api/v4/insider-trading-transaction-type', // TODO: move to lists
}
