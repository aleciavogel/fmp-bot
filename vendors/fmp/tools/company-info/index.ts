import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'

import fmpClient from '@/vendors/fmp/client'
import { symbol, year } from '@/vendors/fmp/param-defs'
import { ExecutiveCompensationData } from '@/vendors/fmp/tools/company-info/types'

import { CompanyInfoEndpoints } from './endpoints'

const fetchCompanyInfo = new DynamicStructuredTool({
  name: 'fetchCompanyInfo',
  description:
    'Fetch company information for a given stock symbol. For the executive compensation, include a year to get the relevant information.',
  schema: z.object({
    symbol,
    type: z.enum([
      'profile',
      'executive compensation',
      'analyst estimates',
      'analyst stock recommendations',
    ]),
    year: year.optional().default(new Date().getFullYear()),
  }),
  func: async ({ type, ...params }) => {
    switch (type) {
      case 'profile':
        return await fetchCompanyProfile.func(params)
      case 'executive compensation':
        return await fetchExecutiveCompensation.func(params)
      case 'analyst estimates':
        return await fetchAnalystEstimates.func(params)
      case 'analyst stock recommendations':
        return await fetchAnalystStockRecommendations.func(params)
      default:
        throw new Error(`Invalid type`)
    }
  },
})

const fetchCompanyProfile = new DynamicStructuredTool({
  name: 'fetchCompanyProfile',
  description:
    'Fetch a company profile (information about a company, general description) for a given stock symbol.',
  schema: z.object({
    symbol,
  }),
  func: async (params) => {
    const response = await fmpClient.request(CompanyInfoEndpoints.Profile, params)
    return JSON.stringify(response)
  },
})

const fetchExecutiveCompensation = new DynamicStructuredTool({
  name: 'fetchExecutiveCompensation',
  description: 'Fetch executive compensation information for a company.',
  schema: z.object({
    symbol,
    year: year.optional().default(new Date().getFullYear()),
  }),
  func: async ({ symbol, year }) => {
    const response: ExecutiveCompensationData[] = await fmpClient.request(
      CompanyInfoEndpoints.ExecutiveCompensation,
      { symbol },
    )

    if (response.length === 0) {
      return 'No info for this year.'
    }

    // Narrow by year
    const filtered = response.filter((exec) => exec.year === year)
    const info = filtered.map((comp) => {
      return {
        nameAndPosition: comp.nameAndPosition,
        salary: comp.salary,
        bonus: comp.bonus,
        stock_award: comp.stock_award,
        incentive_plan_compensation: comp.incentive_plan_compensation,
        all_other_compensation: comp.all_other_compensation,
        total: comp.total,
        source: comp.url,
      }
    })

    return JSON.stringify(info)
  },
})

const fetchAnalystEstimates = new DynamicStructuredTool({
  name: 'fetchAnalystEstimates',
  description: 'Fetch analyst estimates for a company.',
  schema: z.object({
    symbol,
  }),
  func: async (params) => {
    const response = await fmpClient.request(CompanyInfoEndpoints.AnalystEstimates, params)
    return JSON.stringify(response)
  },
})

const fetchAnalystStockRecommendations = new DynamicStructuredTool({
  name: 'fetchAnalystStockRecommendations',
  description:
    "Fetch analyst recommendations for buying, selling, or holding a company's stock. Investors can use this information to get a sense of what analysts think of a company's stock and to make informed investment decisions".trim(),
  schema: z.object({
    symbol,
  }),
  func: async (params) => {
    const response = await fmpClient.request(
      CompanyInfoEndpoints.AnalystStockRecommendations,
      params,
    )
    return JSON.stringify(response)
  },
})

const fetchLogoForSymbol = new DynamicStructuredTool({
  name: 'fetchLogoForSymbol',
  description: 'Fetch a company logo for a given stock symbol.'.trim(),
  schema: z.object({
    symbol,
  }),
  func: async (params) => {
    const url = fmpClient.getUrl(CompanyInfoEndpoints.CompanyLogo, params)
    return JSON.stringify(url)
  },
})

const fetchCompanyNotes = new DynamicStructuredTool({
  name: 'fetchCompanyNotes',
  description:
    "Stay up-to-date on a company's financial condition, operations, and risks with our Company Notes endpoint. This endpoint provides information about notes reported by a company in their financial statements.".trim(),
  schema: z.object({
    symbol,
  }),
  func: async (params) => {
    const response = await fmpClient.request(CompanyInfoEndpoints.CompanyNotes, params)
    return JSON.stringify(response)
  },
})

// TODO: Too many tokens
// const fetchCompanyOutlook = new DynamicStructuredTool({
//   name: 'fetchCompanyOutlook',
//   description:
//     'The FMP Company Outlook endpoint provides an overview of a company, including its profile information, most recent insider trading transactions, and financial statements. Investors can use this information to get a comprehensive understanding of a company and to make informed investment decisions.',
//   schema: z.object({
//     symbol,
//   }),
//   func: async (params) => {
//     const response = await fmpClient.request(CompanyInfoEndpoints.CompanyOutlook, params)
//     return JSON.stringify(response)
//   },
// })

const companyInfoTools = [
  fetchCompanyInfo,
  // fetchCompanyProfile,
  // fetchExecutiveCompensation,
  // fetchAnalystEstimates,
  // fetchAnalystStockRecommendations,
  // fetchLogoForSymbol,
  // fetchCompanyNotes,
  // fetchCompanyOutlook,
]

export default companyInfoTools
