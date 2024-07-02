import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'

import fmpClient from '@/vendors/fmp/client'
import { EXCHANGES } from '@/vendors/fmp/constants'

import { CompanySearchEndpoints } from './endpoints'

const searchForCompanySymbol = new DynamicStructuredTool({
  name: 'searchForCompanySymbol',
  description:
    'Select the most appropriate symbol for a company name based on preferred stock exchanges.',
  schema: z.object({
    query: z.string().describe('The company to search for'),
    exchange: z
      .enum(EXCHANGES)
      .optional()
      .describe('The exchange to search within.')
      .default('NASDAQ'),
  }),
  func: async ({ query, exchange }) => {
    const response = fmpClient.request(CompanySearchEndpoints.General, { query, exchange })
    return JSON.stringify(response)
  },
})

const companySearchTools = [searchForCompanySymbol]

export default companySearchTools
