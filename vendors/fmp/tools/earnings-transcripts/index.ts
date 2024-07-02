import { DynamicStructuredTool } from '@langchain/core/tools'
import { z } from 'zod'

import fmpClient from '@/vendors/fmp/client'
import { quarter, symbol, year } from '@/vendors/fmp/param-defs'
import { EarningsCall } from '@/vendors/fmp/tools/earnings-transcripts/types'

import { EarningsTranscriptsEndpoints } from './endpoints'

const fetchEarningsCallTranscript = new DynamicStructuredTool({
  name: 'fetchEarningsTranscript',
  description: 'Fetch earnings call transcript for a given stock symbol.',
  schema: z.object({
    symbol,
    quarter,
    year: year.default(new Date().getFullYear()),
  }),
  func: async (params) => {
    const response: EarningsCall[] = await fmpClient.request(
      EarningsTranscriptsEndpoints.Transcript,
      params,
    )

    if (response.length === 0) {
      return 'No transcript for the provided params.'
    }

    return JSON.stringify(response[0].content)
  },
})

const tools = [fetchEarningsCallTranscript]

export default tools
