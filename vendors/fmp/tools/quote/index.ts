import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'

import fmpClient from '@/vendors/fmp/client'

import { QuoteEndpoints } from './endpoints'

const fetchQuote = new DynamicStructuredTool({
  name: 'fetchQuoteForSymbol',
  description:
    'Fetch quote information for a given stock symbol, including cryptocurrencies, forex pairs, and more. If a cryptocurrency does not have USD appended to the end, try searching for the symbol first.',
  schema: z.object({
    symbol: z.string().describe('The symbol of the stock or asset to fetch the quote for.'),
    type: z.enum([
      'last crypto price',
      'last forex price',
      'quote by symbol',
      'forex quote',
      'quote order',
      'quote short',
      'realtime stock price',
      'realtime otc price',
      'stock price change',
    ]),
  }),
  func: async ({ type, symbol }) => {
    let endpoint = ''
    const params = { symbol }

    switch (type) {
      case 'last crypto price':
        endpoint = QuoteEndpoints.CryptoPrice
        break
      case 'last forex price':
        endpoint = QuoteEndpoints.ForexPrice
        break
      case 'quote by symbol':
        endpoint = QuoteEndpoints.BySymbol
        break
      case 'realtime stock price':
        endpoint = QuoteEndpoints.RealTimeFullStockPrice
        break
      case 'realtime otc price':
        endpoint = QuoteEndpoints.RealTimeOtcPrice
        break
      case 'stock price change':
        endpoint = QuoteEndpoints.StockPriceChange
        break
      case 'quote order':
        endpoint = QuoteEndpoints.QuoteOrder
        break
      case 'quote short':
        endpoint = QuoteEndpoints.QuoteShort
        break
      case 'forex quote':
        endpoint = QuoteEndpoints.ForexQuote
        break
      default:
        throw new Error(`Invalid type`)
    }

    const response = await fmpClient.request(endpoint, params)

    return JSON.stringify(response)
  },
})

const tools = [fetchQuote]

export default tools
