import fmpClient from '@repo/fmp/lib/client';

import { EarningsEndpoints } from './endpoints';
import type { EarningsParams, CalendarEarningsApiResponse, ConfirmedEarningsApiResponse, HistoricalEarningsApiResponse, SurprisesEarningsApiResponse } from './types';

type EarningsHandlerParams = Omit<EarningsParams, "earningsType">

export const handleCalendar = async (params: EarningsHandlerParams): Promise<CalendarEarningsApiResponse> => {
  return await fmpClient.request(EarningsEndpoints.Calendar, params)
}

export const handleConfirmed = async (params: EarningsHandlerParams): Promise<ConfirmedEarningsApiResponse> => {
  return await fmpClient.request(EarningsEndpoints.Confirmed, params)
}

export const handleHistorical = async (params: EarningsHandlerParams): Promise<HistoricalEarningsApiResponse> => {
  return await fmpClient.request(EarningsEndpoints.Historical, params)
}

export const handleSurprises = async (params: EarningsHandlerParams): Promise<SurprisesEarningsApiResponse> => {
  return await fmpClient.request(EarningsEndpoints.Surprises, params)
}
