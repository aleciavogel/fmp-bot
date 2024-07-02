import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'

import fmpClient from '@/vendors/fmp/client'
import {
  BalanceSheet,
  CashFlowStatement,
  IncomeStatement,
} from '@/vendors/fmp/tools/financial-statements/types'

import { MarketPerformanceEndpoints } from './endpoints'

const fetchMarketPerformance = new DynamicStructuredTool({
  name: 'fetchMarketPerformance',
  description:
    'Provides various market performance data including the most active stocks, top gainers, and top losers. The data is limited to the top 10 of each list.',
  schema: z.object({
    type: z.enum(['most active', 'top gainers', 'top losers']),
  }),
  func: async ({ type }) => {
    let response: Array<BalanceSheet | CashFlowStatement | IncomeStatement> = []

    switch (type) {
      case 'most active':
        response = await fmpClient.request(MarketPerformanceEndpoints.MostActive)
        break
      case 'top gainers':
        response = await fmpClient.request(MarketPerformanceEndpoints.TopGainers)
        break
      case 'top losers':
        response = await fmpClient.request(MarketPerformanceEndpoints.TopLosers)
        break
      default:
        throw new Error(`Invalid type`)
    }

    return JSON.stringify(response.slice(0, 10))
  },
})

const tools = [fetchMarketPerformance]

export default tools
