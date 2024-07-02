export enum CompanySearchEndpoints {
  CikByName = '/api/v3/cik-search/{companyName}',
  Cusip = '/api/v3/cusip/{cusip}',
  General = '/api/v3/search',
  Isin = '/api/v4/search/isin',
  Name = '/api/v3/search-name',
  NameByCik = '/api/v3/cik/{cik}',
  Ticker = '/api/v3/search-ticker',
}
