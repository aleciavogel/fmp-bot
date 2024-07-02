import type { FunctionDef } from '@repo/openai/types'

import { handleCalendar, handleConfirmed, handleHistorical, handleSurprises } from './handlers'
import type { EarningsParams } from './types'
import { from, limit, symbol, to } from '../param-defs'
// import { } from '../param-defs'

const earnings: Record<string, FunctionDef> = {
  getEarningsData: {
    def: {
      type: 'function',
      function: {
        name: 'getEarningsData',
        description:
          "Get earnings information for a company. The 'symbol' parameter is required for 'surprises' type, and optional for other types. The 'from' and 'to' parameters are optional and define the date range for the earnings information. The 'limit' parameter is optional and specifies the number of earnings records to retrieve.",
        parameters: {
          type: 'object',
          properties: {
            earningsType: {
              type: 'string',
              description: 'Type of data to retrieve.',
              enum: ['calendar', 'confirmed', 'historical', 'surprises'],
            },
            symbol,
            from,
            to,
            limit,
          },
          required: ['earningsType'],
        },
      },
    },
    handler: async ({ earningsType, ...params }: EarningsParams) => {
      switch (earningsType) {
        case 'calendar':
          return await handleCalendar(params)
        case 'confirmed':
          return await handleConfirmed(params)
        case 'historical':
          return await handleHistorical(params)
        case 'surprises':
          return await handleSurprises(params)
        default:
          throw new Error('Invalid earnings data type')
      }
    },
  },
}

export const earningsHandlers = Object.fromEntries(
  Object.entries(earnings).map(([name, { handler }]) => [name, handler]),
)

export const earningsTools = Object.values(earnings).map(({ def }) => def)
