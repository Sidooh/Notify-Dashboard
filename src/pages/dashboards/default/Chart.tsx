import { memo, useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import {
    ChartAid,
    chartSelectOptions,
    ComponentLoader,
    Frequency,
    LoadingButton,
    Period,
    SectionError,
    Str
} from '@nabcellent/sui-react';
import { useGetDashboardChartDataQuery } from 'features/dashboard/dashboardApi';
import CardBgCorner from 'components/CardBgCorner';
import { logger } from 'utils/logger';
import { Line } from "react-chartjs-2";
import {
    CategoryScale,
    Chart,
    ChartData,
    ChartOptions,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip as ChartTooltip
} from "chart.js";
import Tooltip from "@mui/material/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";

Chart.register(Title, ChartTooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)
Chart.defaults.color = '#0F1B4C'
Chart.defaults.font.weight = '700'
Chart.defaults.font.family = "'Avenir', sans-serif"

const DashboardChart = memo(() => {
    const [chartTypeOpt, setChartTypeOpt] = useState<'time-series' | 'cumulative'>('time-series')
    const [chartFreqOpt, setChartFreqOpt] = useState(Frequency.HOURLY)
    const [chartPeriodOpt, setChartPeriodOpt] = useState(Period.LAST_24_HOURS)
    const [labels, setLabels] = useState<string[]>([])
    const [dataset, setDataset] = useState<number[]>([])

    const { data, isError, error, isLoading, isSuccess, refetch, isFetching } = useGetDashboardChartDataQuery();

    useEffect(() => {
        if (data?.length) {
            const aid = new ChartAid(chartPeriodOpt, chartFreqOpt, )
            aid.timeIsUTC = true

            let { labels, dataset } = aid.getDataset(data)

            setLabels(labels)

            if(chartTypeOpt === 'cumulative') {
                dataset = dataset.reduce((a: number[], b, i) => i === 0 ? [b] : [...a, b + a[i - 1]], [])
            }
            setDataset(dataset)
        }
    }, [data, chartPeriodOpt, chartFreqOpt, chartTypeOpt])

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !data) return <ComponentLoader/>;

    logger.log(data);

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        layout:{
            padding:{
               top:10
            }
        },
        interaction: {
            intersect: false,
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            },
            x: {
                border: {
                    display: false
                },
                grid: {
                    color: 'rgba(250, 250, 250, .1)',
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                align: 'start',
                display: true,
                text: 'NOTIFICATIONS',
                padding: {
                    bottom: 25
                },
                font: {
                    size: 17
                }
            },
            tooltip: {
                displayColors: false,
            }
        },
    };

    const chartData: ChartData<'line'> = {
        labels,
        datasets: [{
            label: 'Notifications',
            data: dataset,
            borderColor: ['rgba(255, 255, 255, 1)'],
            backgroundColor: '#0F1B4C',
            borderWidth: 2,
            tension: 0.3,
        }],
    };

    return (
        <Card className="mb-0 mb-xxl-3">
            <CardBgCorner/>
            <Card.Body className={'position-relative'}
                       style={{
                           height: 300,
                           backgroundImage: 'linear-gradient(-45deg, rgba(255, 255, 255, 0), #648381)'
                       }}>
                <div className="position-absolute right-0 me-3 align-items-center gx-1 row justify-content-end">
                    <div className="col-auto">
                        <Tooltip title="Refresh Chart" placement={'left'}>
                            <span>
                                <LoadingButton disabled={isFetching} loading={isFetching}
                                               spinner-position="replace" onClick={() => refetch()}>
                                    <FontAwesomeIcon icon={faSync}/>
                                </LoadingButton>
                            </span>
                        </Tooltip>
                    </div>
                    <div className="col-auto">
                        <Form.Select className="px-2" value={chartTypeOpt} size={'sm'} onChange={e => {
                            setChartTypeOpt(e.target.value as 'time-series' | 'cumulative')
                        }}>
                            <option value="time-series">Time Series</option>
                            <option value="cumulative">Cumulative</option>
                        </Form.Select>
                    </div>
                    <div className="col-auto">
                        <Form.Select className="px-2" size={'sm'} value={chartPeriodOpt}
                                     onChange={e => {
                                         setChartPeriodOpt(e.target.value as Period)
                                         setChartFreqOpt(chartSelectOptions[e.target.value as Period][0])
                                     }}>
                            {Object.values(Period).map(p => <option key={p} value={p}>{Str.headline(p)}</option>)}
                        </Form.Select>
                    </div>
                    <div className="col-auto">
                        <Form.Select className="px-2" value="chartFreqOpt" size={'sm'} onChange={e => {
                            setChartFreqOpt(e.target.value as Frequency)
                        }} disabled={chartSelectOptions[chartPeriodOpt].length < 2}>
                            {chartSelectOptions[chartPeriodOpt].map(f => (
                                <option key={f} value={f}>{Str.headline(f)}</option>
                            ))}
                        </Form.Select>
                    </div>
                </div>

                <Line options={options} data={chartData}/>
            </Card.Body>
        </Card>
    );
});

export default DashboardChart;
