import { fmpApiKey } from './api'

const FMP_BASE_URL = 'https://financialmodelingprep.com'

/**
 * Base Module for the Financial Modeling Prep API
 */
class FmpApiModule {
  /**
   * Financial Modeling Prep API Key
   * @protected
   */
  protected apiKey: string
  /**
   * Financial Modeling Prep API Base Endpoint
   * @protected
   */
  protected baseUrl: string

  /**
   * Constructor for the Base Module
   * @param apiKey - the API key to use for requests
   * @param baseUrl - the base URL for the API
   */
  constructor({ apiKey, baseUrl }: { apiKey?: string; baseUrl?: string } = {}) {
    this.apiKey = apiKey ?? fmpApiKey
    this.baseUrl = baseUrl ?? FMP_BASE_URL
  }

  /**
   * Replace placeholders in the endpoint with values from params
   * @param endpoint - the endpoint with placeholders
   * @param params - the parameters to replace placeholders
   * @protected
   */
  protected replacePlaceholders(endpoint: string, params: Record<string, string>): string {
    Object.keys(params).forEach((key) => {
      const regex = new RegExp(`{${key}}`, 'g')
      endpoint = endpoint.replace(regex, params[key] ?? '')
    })
    return endpoint
  }

  /**
   * Request data from the FMP API
   * @param endpoint - the endpoint to request data from
   * @param params - the parameters to pass to the endpoint
   * @protected
   */
  public async request(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    // Replace placeholders in the endpoint
    endpoint = this.replacePlaceholders(endpoint, params)

    const url = new URL(`${this.baseUrl}${endpoint}`)
    url.searchParams.append('apikey', this.apiKey)
    Object.keys(params).forEach((key) => {
      if (params[key]) {
        url.searchParams.append(key, params[key])
      }
    })

    try {
      const response = await fetch(url.toString())
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error)
      throw error
    }
  }
}

const fmpClient = new FmpApiModule()

export default fmpClient
