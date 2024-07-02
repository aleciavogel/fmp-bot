import { z } from 'zod'

// Which
export const whichQuotes = z
  .enum(['forex', 'crypto', 'stock', 'index', 'commodity'])
  .describe('Which type of data to retrieve quotes for')

// The format of the response. JSON or CSV. Default: json
export const datatype = z
  .enum(['json', 'csv'])
  .describe('The format of the response. JSON or CSV. Default: json')

// The structure of the response. Default: hierarchy
export const structure = z
  .enum(['flat', 'hierarchy'])
  .describe('The structure of the response. Default: hierarchy')

// The period of the data. Default: annual
export const period = z
  .enum(['annual', 'quarter'])
  .describe('The period of the data. Default: annual')

// The fiscal period of the data. Default: FY
export const fiscalReportPeriod = z
  .enum(['FY', 'Q1', 'Q2', 'Q3', 'Q4'])
  .describe('The period of the data')

// Fiscal Quarter
export const fiscalReportQuarter = z
  .enum(['Q1', 'Q2', 'Q3', 'Q4'])
  .describe('The fiscal quarter of the data')

// The symbol of the company. Example: AAPL
export const symbol = z.string().describe('The symbol of the company. Example: AAPL')

// The symbol of the cryptocurrency. Example: BTCUSD
export const cryptocurrency = z
  .string()
  .describe('The symbol of the cryptocurrency. Example: BTCUSD')

// A forex currency pair
export const forex = z.string().describe('A forex currency pair. Example: EURUSD')

// Comma-delineated list of symbols. Example: AAPL,GOOGL
export const tickers = z.string().describe('Comma-delineated list of symbols. Example: AAPL,GOOGL')

// The symbol or CIK of the company. Example: AAPL
export const symbolOrCik = z.string().describe('The symbol or CIK of the company. Example: AAPL')

// The CIK of the company. Example: 0000320193
export const cik = z.string().describe('The CIK of the company. Example: 0000320193')

// The CUSIP of the company. Example: 000360206
export const cusip = z.string().describe('The CUSIP of the company. Example: 000360206')

// The ISIN of the company. Example: US0378331005
export const isin = z.string().describe('The ISIN of the company. Example: US0378331005')

// The CIK of the reporting company. Example: 0000320193
export const reportingCik = z
  .string()
  .describe('The CIK of the reporting company. Example: 0000320193')

// The start date of the historical data to view. Format: YYYY-MM-DD
export const from = z
  .string()
  .describe('The start date of the historical data to view. Format: YYYY-MM-DD')

// The end date of the historical data to view. Format: YYYY-MM-DD
export const to = z
  .string()
  .describe('The end date of the historical data to view. Format: YYYY-MM-DD')

// The maximum number of data points to return
export const limit = z
  .number()
  .describe('The maximum number of data points to return. Example: 100')

// The timeframe for the historical data. Example: 1d
export const timeframe = z
  .enum(['1min', '5min', '15min', '30min', '1hour', '4hour'])
  .describe('The timeframe for the historical data. Example: 4hour')

// The timeframe for the technical indicators
export const technicalIndicatorTimeframe = z
  .enum(['1min', '5min', '15min', '30min', '1hour', '4hour', '1day'])
  .describe('The timeframe for the technical indicators')

// The type of technical indicator
export const technicalIndicatorType = z
  .enum(['sma', 'ema', 'wma', 'dema', 'tema', 'williams', 'rsi', 'adx', 'standardDeviation'])
  .describe('The type of technical indicator')

// The period of the technical indicator. Example: 10
export const technicalIndicatorPeriod = z
  .number()
  .describe('The period of the technical indicator. Example: 10')

// The type of series to view. Example: line
export const serietype = z.string().describe('The type of series to view. Example: line')

// The type of SEC filing
export const secFilingType = z.string().describe('The type of SEC filing. Example: 10')

// Whether the SEC filing is done
export const isDone = z.boolean().describe('Whether the SEC filing is done')

// Whether to view extended hours data. Default: false
export const extended = z.boolean().describe('Whether to view extended hours data. Default: false')

// The target exchange. Example: NYSE
export const exchange = z.string().describe('The target exchange. Example: NYSE')

// The target country, formatted as an ISO 3166-1 alpha-2 country code. Example: US
export const country = z
  .string()
  .describe('The target country, formatted as an ISO 3166-1 alpha-2 country code. Example: US')

// Whether the SEC filing has financial data
export const hasFinancial = z.boolean().describe('Whether the SEC filing has financial data')

// SIC code of the company
export const sicCode = z.string().describe('SIC code of the company. Example: 6321')

// The title of the target industry
export const industryTitle = z.string().describe('The title of the target industry')

// The minimum market capitalization of the stock
export const marketCapMoreThan = z
  .number()
  .describe('The minimum market capitalization of the stock')

// The maximum market capitalization of the stock
export const marketCapLowerThan = z
  .number()
  .describe('The maximum market capitalization of the stock')

// The minimum price of the stock
export const volumeMoreThan = z.number().describe('The minimum volume of the stock')

// The maximum volume of the stock
export const volumeLowerThan = z.number().describe('The maximum volume of the stock')

// The minimum beta of the stock
export const betaMoreThan = z.number().describe('The minimum beta of the stock')

// The maximum beta of the stock
export const betaLowerThan = z.number().describe('The maximum beta of the stock')

// The minimum dividend of the stock
export const dividendMoreThan = z.number().describe('The minimum dividend of the stock')

// The maximum dividend of the stock
export const dividendLowerThan = z.number().describe('The maximum dividend of the stock')

// The sector of the stock
export const sector = z.string().describe('The sector of the stock')

// The industry of the stock
export const industry = z.string().describe('The industry of the stock')

// The currency of the stock
export const currency = z.string().describe('The currency of the stock')

// Whether the stock is an ETF
export const isEtf = z.boolean().describe('Whether the stock is an ETF')

// Whether the stock is a fund
export const isFund = z.boolean().describe('Whether the stock is a fund')

// Whether the stock is actively trading
export const isActivelyTrading = z.boolean().describe('Whether the stock is actively trading')

// The page number of the results
export const page = z.number().describe('The page number of the results')

// The number of results per page
export const size = z.number().describe('The number of results per page')

// The target year
export const year = z.number().describe('The target year')

// The target quarter
export const quarter = z.number().describe('The target quarter')

// The target date. Format: YYYY-MM-DD
export const date = z.string().describe('The target date. Format: YYYY-MM-DD')

// The name of the company, campaign, or crowdfunding platform
export const crowdfundingName = z
  .string()
  .describe('The name of the company, campaign, or crowdfunding platform')

// The search query to use for the CIK look-up
export const cikSearchName = z
  .string()
  .describe('The search query to use for the CIK look-up. Example: zuckerberg')

// Name of institutional manager, ticker symbol, or CUSIP number. Example: Berkshire Hathaway
export const institutionalHolderName = z
  .string()
  .describe(
    'Name of institutional manager, ticker symbol, or CUSIP number. Example: Berkshire Hathaway',
  )

// Whether to include the current quarter
export const includeCurrentQuarter = z.boolean().describe('Whether to include the current quarter')

// The name of the company to search for. Example: syros
export const mergersAcquisitionSearchName = z
  .string()
  .describe('The name of the company to search for. Example: syros')

// The name of the company to retrieve. Example: Vanguard
export const mutualFundName = z
  .string()
  .describe('The name of the company to retrieve. Example: Vanguard')

// The name of the analyst to retrieve. Example: Tim Anderson
export const analystName = z
  .string()
  .describe('The name of the analyst to retrieve. Example: Tim Anderson')

// The name of the target company. Example: Barclays
export const companyName = z.string().describe('The name of the target company. Example: Barclays')

// The name of the company, offering, or exchange
export const equityOfferingName = z
  .string()
  .describe('The name of the company, offering, or exchange. Example: NJOY')

// Market state type. Example: bearish
export const marketStateType = z
  .enum(['bearish', 'bullish'])
  .describe('Market state type. Example: bearish')

// Source of trending social sentiment data. Example: stocktwits
export const socialSentimentSource = z
  .string()
  .describe('Source of trending social sentiment data. Example: stocktwits')

// Name of economic indicator to use
export const economicIndicatorName = z
  .enum([
    'GDP',
    'realGDP',
    'nominalPotentialGDP',
    'realGDPPerCapita',
    'federalFunds',
    'CPI',
    'inflationRate',
    'inflation',
    'retailSales',
    'consumerSentiment',
    'durableGoods',
    'unemploymentRate',
    'totalNonfarmPayroll',
    'initialClaims',
    'industrialProductionTotalIndex',
    'newPrivatelyOwnedHousingUnitsStartedTotalUnits',
    'totalVehicleSales',
    'retailMoneyFunds',
    'smoothedUSRecessionProbabilities',
    '3MonthOr90DayRatesAndYieldsCertificatesOfDeposit',
    'commercialBankInterestRateOnCreditCardPlansAllAccounts',
    '30YearFixedRateMortgageAverage',
    '15YearFixedRateMortgageAverage',
  ])
  .describe('Name of economic indicator to use')

// The search query to use for the search. Example: AA
export const searchQuery = z.string().describe('The query to search for. Example: AA')

// No parameters are available
export const noParams = z.object({}).describe('No parameters are available')
