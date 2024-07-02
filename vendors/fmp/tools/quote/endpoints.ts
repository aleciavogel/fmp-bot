export enum QuoteEndpoints {
  // AllForexPrices = '/api/v4/fx', -> moved to _lists
  CryptoPrice = '/api/v4/crypto/last',
  // ExchangePrices = '/api/v3/quotes/{exchange}', -> too many tokens
  ForexPrices = '/api/v4/forex/last',
  ForexQuote = '/api/v3/fx/{symbol}',
  BySymbol = '/api/v3/quote/{symbol}',
  QuoteOrder = '/api/v3/quote-order/{symbol}',
  QuoteShort = '/api/v3/quote-short/{symbol}',
  RealTimeFullStockPrice = '/api/v3/stock/full/real-time-price/{symbol}',
  // RealTimePrice = '/api/v3/stock/full/real-time-price', -> too many tokens
  RealTimeOtcPrice = '/api/v3/otc/real-time-price/{symbol}',
  StockPriceChange = '/api/v3/stock-price-change/{symbol}',
  AftermarketTrades = '/api/v4/pre-post-market-trade',
  AftermarketQuotes = '/api/v4/pre-post-market',
  BatchAftermarketQuotes = '/api/v4/batch-pre-post-market',
  BatchAftermarketTrades = '/api/v4/batch-pre-post-market-trade',
}
