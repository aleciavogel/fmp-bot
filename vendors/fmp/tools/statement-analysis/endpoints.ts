export enum StatementAnalysisEndpoints {
  BalanceSheetStatementGrowth = '/api/v3/balance-sheet-statement-growth/{symbol}',
  CashFlowStatementGrowth = '/api/v3/cash-flow-statement-growth/{symbol}',
  EnterpriseValues = '/api/v3/enterprise-values',
  FinancialGrowth = '/api/v3/financial-growth/{symbol}',
  FinancialRatios = '/api/v3/ratios/{symbol}',
  FinancialScore = '/api/v4/score',
  IncomeStatementGrowth = '/api/v3/income-statement-growth/{symbol}',
  KeyMetrics = '/api/v3/key-metrics/{symbol}',
  KeyMetricsTtm = '/api/v3/key-metrics-ttm/{symbol}',
  OwnerEarnings = '/api/v4/owner_earnings',
  RatiosTtm = '/api/v3/ratios-ttm/{symbol}',
}
