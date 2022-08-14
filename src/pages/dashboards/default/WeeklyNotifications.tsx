import { lazy, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import { ComponentLoader, getColor, SectionError } from '@nabcellent/sui-react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { Tooltip } from '@mui/material';
import { useGetDashboardChartDataQuery } from '../../../features/dashboard/dashboardApi';
import CardBgCorner from 'components/CardBgCorner';

const BasicECharts = lazy(() => import('components/common/BasicEChart'))

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    CanvasRenderer
]);

type ChartOptionsType = {
    labels: string[]
    datasets: number[]
}

type WeeklyNotificationsType = {
    width?: string,
    amountClassName?: string
};

const getOptions = (data: ChartOptionsType) => ({
    tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        formatter: '{b0} : {c0}',
        transitionDuration: 0,
        backgroundColor: getColor('100'),
        borderColor: getColor('300'),
        textStyle: {color: getColor('dark')},
        borderWidth: 1
    },
    xAxis: {
        type: 'category',
        data: data.labels,
        boundaryGap: false,
        axisLine: {show: false},
        axisLabel: {show: false},
        axisTick: {show: false},
        axisPointer: {type: 'none'}
    },
    yAxis: {
        type: 'value',
        splitLine: {show: false},
        axisLine: {show: false},
        axisLabel: {show: false},
        axisTick: {show: false},
        axisPointer: {type: 'none'}
    },
    series: [
        {
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                borderRadius: 10
            },
            barWidth: '5px',
            itemStyle: {
                borderRadius: 10,
                color: '#0f1b4c'
            },
            data: data.datasets,
            z: 10
        }
    ],
    grid: {right: 5, left: 10, top: 0, bottom: 0}
});

const WeeklyNotifications = ({width, amountClassName}: WeeklyNotificationsType) => {
    const {data, isError, error, isLoading, isSuccess} = useGetDashboardChartDataQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !data) return <ComponentLoader/>;

    console.log(data);

    return (
        <Card className="mb-3">
            <CardBgCorner/>
            <Card.Header className="pb-0 position-relative">
                <h6 className="mb-0 mt-2">
                    Weekly Notifications
                    <Tooltip placement="top" title={'Calculated according to current week\'s notifications'}>
                        <span>
                            <FontAwesomeIcon icon={['far', 'question-circle']} transform="shrink-1"
                                             className="ms-1 text-400" id="weeklySalesTooltip"/>
                        </span>
                    </Tooltip>
                </h6>
            </Card.Header>

            <Card.Body>
                <BasicECharts echarts={echarts} options={getOptions(data)} style={{height: 100}}/>
            </Card.Body>
        </Card>
    );
};

export default memo(WeeklyNotifications);
