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
      'recent company news',
      'insider trades',
      'ratios',
      'key executives',
      'splits history',
      'stock dividend',
      'ratings',
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
      case 'recent company news':
      case 'insider trades':
      case 'ratios':
      case 'key executives':
      case 'splits history':
      case 'stock dividend':
      case 'ratings':
        return await fetchCompanyOutlook.func({ type, ...params })
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
const fetchCompanyOutlook = new DynamicStructuredTool({
  name: 'fetchCompanyOutlook',
  description:
    'The FMP Company Outlook endpoint provides an overview of a company, including its profile information, most recent insider trading transactions, and financial statements. Investors can use this information to get a comprehensive understanding of a company and to make informed investment decisions.',
  schema: z.object({
    symbol,
    type: z.enum([
      'recent company news',
      'insider trades',
      'ratios',
      'key executives',
      'splits history',
      'stock dividend',
      'ratings',
    ]),
  }),
  func: async ({ symbol, type }) => {
    const response = await fmpClient.request(CompanyInfoEndpoints.CompanyOutlook, { symbol })

    switch (type) {
      case 'recent company news':
        return JSON.stringify(response.stockNews)
      case 'insider trades':
        return JSON.stringify(response.insideTrades)
      case 'ratios':
        return JSON.stringify(response.ratios)
      case 'key executives':
        return JSON.stringify(response.keyExecutives)
      case 'splits history':
        return JSON.stringify(response.splitsHistory)
      case 'stock dividend':
        return JSON.stringify(response.stockDividend)
      case 'ratings':
        return JSON.stringify(response.rating)
      default:
        throw new Error(`Invalid type`)
    }
  },
})

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
