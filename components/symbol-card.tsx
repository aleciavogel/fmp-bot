'use client'

import { FC, useMemo } from 'react'
import React from 'react'
import Chart from 'react-apexcharts'
import { useQuery } from '@tanstack/react-query'

import { fetchChart } from '@/vendors/fmp/tools/charts/utils'
import { IntradayData } from '@/vendors/fmp/tools/charts/types'

interface SymbolCardProps {
  symbol: string | null
}

export const SymbolCard: FC<SymbolCardProps> = ({ symbol }) => {
  const { data, error, isLoading } = useQuery<IntradayData[]>({
    queryKey: ['quotes', symbol],
    queryFn: async () => await fetchChart(symbol),
    enabled: !!symbol,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
  const series = useMemo(() => {
    if (!data) {
      return null
    }

    // Sort by date
    const sorted = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    const prices = sorted.map((chart) => chart.close)
    const dates = sorted.map((chart) => chart.date)

    return {
      prices,
      dates,
    }
  }, [data])

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
      },
      sparkline: {
        enabled: true,
      },
    },
    xaxis: {
      categories: series?.dates,
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: false,
    },
    labels: [],
    tooltip: {
      enabled: true,
      followCursor: true,
    },
  }

  const chartSeries = [
    {
      name: 'Price',
      data: series?.prices ?? [],
    },
  ]

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold">{symbol}</h2>
      <Chart
        options={chartOptions}
        series={chartSeries as ApexCharts.ApexOptions['series']}
        type="line"
        height={300}
      />
    </div>
  )
}

export default SymbolCard
