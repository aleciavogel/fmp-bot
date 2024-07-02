import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'

import fmpClient from '@/vendors/fmp/client'
import { fiscalReportPeriod, symbol, year } from '@/vendors/fmp/param-defs'
import {
  BalanceSheet,
  CashFlowStatement,
  IncomeStatement,
} from '@/vendors/fmp/tools/financial-statements/types'

import { FinancialStatementsEndpoints } from './endpoints'

const filterByYear: <S extends { calendarYear: string }>(year: number, statements: S[]) => S[] = (
  year,
  statements,
) => {
  return statements.filter((statement) => {
    return parseInt(statement.calendarYear.trim()) === year
  })
}

const filterByQuarter: <S extends { period: string }>(
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4',
  statements: S[],
) => S[] = (quarter, statements) => {
  return statements.filter((statement) => statement.period === quarter)
}

const fetchFinancialStatement = new DynamicStructuredTool({
  name: 'fetchFinancialStatement',
  description: 'Get the cash flow, balance sheet, or income statement for a company.',
  schema: z.object({
    symbol,
    period: fiscalReportPeriod,
    year: year.default(new Date().getFullYear()),
    type: z.enum(['income', 'balance', 'cash flow']),
  }),
  func: async ({ type, year, period, ...params }) => {
    let response: Array<BalanceSheet | CashFlowStatement | IncomeStatement> = []
    const periodParam = period === 'FY' ? 'annual' : 'quarter'

    switch (type) {
      case 'income':
        response = await fmpClient.request(FinancialStatementsEndpoints.IncomeStatement, {
          period: periodParam,
          ...params,
        })
        break
      case 'balance':
        response = await fmpClient.request(FinancialStatementsEndpoints.BalanceSheetStatement, {
          period: periodParam,
          ...params,
        })
        break
      case 'cash flow':
        response = await fmpClient.request(FinancialStatementsEndpoints.CashFlowStatement, {
          period: periodParam,
          ...params,
        })
        break
      default:
        throw new Error(`Invalid type`)
    }

    // Filter by the year
    response = filterByYear(year, response)

    if (period !== 'FY') {
      response = filterByQuarter(period, response)
    }

    return JSON.stringify(response[0])
  },
})

const tools = [fetchFinancialStatement]

export default tools
