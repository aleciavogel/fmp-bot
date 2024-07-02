import { DynamicTool } from '@langchain/core/tools'

import companyInfoTools from './company-info'
import companySearchTools from './company-search'
import earningsTranscriptsTools from './earnings-transcripts'
import financialStatementTools from './financial-statements'
import marketPerformanceTools from './market-performance'
import quoteTools from './quote'

const getCurrentDate = new DynamicTool({
  name: 'getCurrentDate',
  description: 'Get the current date.',
  func: async () => {
    return new Date().toLocaleDateString()
  },
})

const tools = [
  ...companyInfoTools,
  ...companySearchTools,
  ...earningsTranscriptsTools,
  ...financialStatementTools,
  ...marketPerformanceTools,
  ...quoteTools,
  getCurrentDate,
]

export default tools
