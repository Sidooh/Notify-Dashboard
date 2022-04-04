import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { getColor } from 'helpers/utils';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import BasicECharts from 'components/common/BasicEChart';
import SoftBadge from 'components/common/SoftBadge';
import classNames from 'classnames';
import { IMAGES } from '../../../constants';
import _ from 'lodash';
import CountUp from 'react-countup';

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
    data: {
        labels: string[]
        datasets: number[]
    }
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
                color: getColor('primary')
            },
            data: data.datasets,
            z: 10
        }
    ],
    grid: {right: 5, left: 10, top: 0, bottom: 0}
});

const WeeklyNotifications = ({data, width, amountClassName}: WeeklyNotificationsType) => {
    return (
        <Card className="h-md-100">
            <div className="bg-holder bg-card"
                 style={{backgroundImage: `url(${IMAGES.icons.spotIllustrations.corner_1})`}}/>
            <Card.Header className="pb-0 position-relative">
                <h6 className="mb-0 mt-2">
                    Weekly Notifications
                    <OverlayTrigger placement="top"
                                    overlay={<Tooltip>Calculated according to current week's notifications</Tooltip>}>
                        <span>
                              <FontAwesomeIcon icon={['far', 'question-circle']} transform="shrink-1"
                                               className="ms-1 text-400" id="weeklySalesTooltip"/>
                        </span>
                    </OverlayTrigger>
                </h6>
            </Card.Header>

            <Card.Body as={Flex} alignItems="end" justifyContent="between">
                <div>
                    <h2
                        className={classNames(
                            amountClassName,
                            'mb-1 text-700 fw-normal lh-1'
                        )}
                    >
                        <CountUp end={_.sum(data?.datasets)}/>
                    </h2>
                    <SoftBadge pill bg="success" className="me-2 fs--2">
                        +3.5%
                    </SoftBadge>
                </div>
                {
                    data && <BasicECharts
                        echarts={echarts}
                        options={getOptions(data)}
                        style={{width: width || '8.5rem', height: 60}}
                    />
                }
            </Card.Body>
        </Card>
    );
};

export default memo(WeeklyNotifications);
