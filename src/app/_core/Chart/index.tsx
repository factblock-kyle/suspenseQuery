import { useEffect, useState } from 'react';

import { EChartOption } from 'echarts';
import ECharts, { EChartsOption } from 'echarts-for-react';

interface ChartProps {
  width: number;
  height: number;
  chartData?: {
    date: string;
    participator_count: number;
    view_count: number;
  }[];
}
// chartData는 향후 Chart의 실제 데이터를 기반으로 타입 지정 예정

export default function Index({
  width = 100,
  height = 100,
  chartData,
}: ChartProps) {
  const [options, setOptions] = useState<EChartsOption>({});

  useEffect(() => {
    const dateList = chartData?.map((data) => data.date);
    const participatorList = chartData?.map((data) => data.participator_count);
    const viewList = chartData?.map((data) => data.view_count);

    setOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: EChartOption.Tooltip.Format[]) => {
          const info = params.filter(
            (param: EChartOption.Tooltip.Format) => param.data !== undefined,
          );
          return info
            .map(
              (
                i: EChartOption.Tooltip.Format,
              ) => `<div style="margin-left: 5px; margin-right: 5px; font-size: 12px; line-height: 18px; font-weight: 600; text-align: center;">${i.data === null ? 0 : i.data}</div>
                    <div style="margin-left: 5px; margin-right: 5px; color: #757575; font-size: 10px; line-height: 15px; text-align: center;">${i.seriesName}</div>`,
            )
            .join('<div style="margin-top: 8px;" />');
        },
      },
      grid: {
        right: 0,
      },
      legend: {
        data: ['title1', 'title2'],
        icon: 'circle',
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        data: dateList,
        boundaryGap: true,
        splitLine: {
          show: true,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        nameTextStyle: {
          fontSize: 10,
        },
        axisLabel: {
          fontSize: 10,
        },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: 'title1',
          type: 'bar',
          itemStyle: {
            color: '#FFB423',
            borderRadius: [10, 10, 0, 0],
          },
          barWidth: '6px',
          data: viewList,
        },
        {
          name: 'title2',
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbolSize: 12,
          lineStyle: {
            color: '#04BFDA',
            width: 2,
          },
          itemStyle: {
            color: '#04BFDA',
          },
          emphasis: {
            itemStyle: {
              opacity: 0,
            },
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#0AE1EF',
              },
              {
                offset: 1,
                color: '#04BFDA',
              },
            ]),
          },
          data: participatorList,
        },
      ],
    });
  }, [chartData]);

  return <ECharts option={options} opts={{ width, height }} />;
}
