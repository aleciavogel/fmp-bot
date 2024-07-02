export enum SecFilingsEndpoints {
  EightK = '/api/v4/rss_feed_8k',
  All = '/api/v4/rss_feed_all', // TODO: move to lists
  Company = '/api/v3/sec_filings/{symbol}',
  IndividualIndustry = '/api/v4/standard_industrial_classification',
  IndustryAll = '/api/v4/standard_industrial_classification/all',
  IndustryCodes = '/api/v4/standard_industrial_classification_list',
  RealTime = '/api/v4/rss_feed',
  RealTimeV3 = '/api/v3/rss_feed',
}
