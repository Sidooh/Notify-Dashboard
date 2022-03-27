import React from 'react';
import {utils} from '../../../utils/utils';
import EChart from '../../../components/EChart';

type ChartData = {
    data: {
        labels: string[]
        datasets: number[]
    }
}

const getPosition = (pos: number[], size: { contentSize: number[] }) => {
    return {
        top: pos[1] - size.contentSize[1] - 10,
        left: pos[0] - size.contentSize[0] / 2
    };
};

const WeeklyNotifications = ({data}: ChartData) => {
    return (
        <EChart
            options={{
                tooltip: {
                    trigger: 'axis',
                    padding: [7, 10],
                    formatter: '{b0} : {c0}',
                    transitionDuration: 0,
                    backgroundColor: utils.getGrays()['100'],
                    borderColor: utils.getGrays()['300'],
                    textStyle: {
                        color: utils.getColors().dark
                    },
                    borderWidth: 1,
                    position: (pos: number[], params: any, dom: any, rect: any, size: any) => getPosition(pos, size),
                },
                xAxis: {
                    type: 'category',
                    data: data?.labels,
                    boundaryGap: false,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisPointer: {
                        type: 'none'
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisPointer: {
                        type: 'none'
                    }
                },
                series: [{
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        borderRadius: 10
                    },
                    barWidth: '5px',
                    itemStyle: {
                        borderRadius: 10,
                        color: utils.getColors().primary
                    },
                    data: data?.datasets,
                    z: 10,
                    emphasis: {
                        itemStyle: {
                            color: utils.getColors().primary
                        }
                    }
                }],
                grid: {
                    right: 5,
                    left: 10,
                    top: 0,
                    bottom: 0
                }
            }}
            // @ts-ignore
            style={{height: '100%', width: '8.5rem'}} className={'h-100'}
        />
    );
};

export default WeeklyNotifications;