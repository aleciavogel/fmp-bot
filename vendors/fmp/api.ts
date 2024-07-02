import { assertValue } from '@/lib/utils'

/** Financial Modeling Prep API Key */
export const fmpApiKey = assertValue(
  process.env.NEXT_PUBLIC_FMP_API_KEY,
  'Missing environment variable: NEXT_PUBLIC_FMP_API_KEY',
)
