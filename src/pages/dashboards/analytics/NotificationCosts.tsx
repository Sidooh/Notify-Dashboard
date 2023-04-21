import { ChangeEvent, useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import {
    ChartAid,
    chartGradient,
    ComponentLoader,
    Frequency,
    groupBy,
    Period,
    RawAnalytics,
    SectionError,
    Status
} from '@nabcellent/sui-react';
import { ChartData, ChartOptions } from "chart.js";
import { useGetNotificationCostsQuery } from 'features/analytics/analyticsApi';
import { defaultLineChartOptions, getSMSProviderColor } from "utils/helpers";
import LineChart from "components/LineChart";
import { SMSProvider } from "../../../utils/enums";

type Dataset = { provider: SMSProvider, dataset: number[], color: string | number[], hidden: boolean }

const NotificationCosts = () => {
    const [bypassCache, setBypassCache] = useState(false)

    const { data, isError, error, isLoading, isSuccess, refetch, isFetching } = useGetNotificationCostsQuery();

    const [txStatus, setTxStatus] = useState<Status | 'ALL'>(Status.COMPLETED);
    const [chartTypeOpt, setChartTypeOpt] = useState<'time-series' | 'cumulative'>('time-series')
    const [chartPeriodOpt, setChartPeriodOpt] = useState(Period.LAST_SIX_MONTHS)
    const [chartFreqOpt, setChartFreqOpt] = useState(Frequency.MONTHLY)
    const [labels, setLabels] = useState<string[]>([])
    const [datasets, setDatasets] = useState<Dataset[]>([])
    const [checkedProviders, setCheckedProviders] = useState<(string | SMSProvider)[]>([])

    const drawChart = (data: any) => {
        let groupedData: {
                [key: string]: RawAnalytics[]
            } = groupBy(data, txStatus === 'ALL' ? 'date' : 'status'),
            rawData: RawAnalytics[]

        if (txStatus === 'ALL') {
            rawData = Object.keys(groupedData).map((date) => groupedData[date].reduce((prev, curr) => ({
                date: Number(date),
                amount: Number(prev.amount) + Number(curr.amount)
            }), { date: 0, amount: 0 }))
        } else {
            rawData = groupedData[txStatus] ?? []
        }

        const aid = new ChartAid(chartPeriodOpt, chartFreqOpt, 'amount')
        aid.timeIsUTC = true
        let { labels, dataset } = aid.getDataset(rawData)

        if (chartTypeOpt === 'cumulative') {
            dataset = dataset.reduce((a: number[], b, i) => i === 0 ? [b] : [...a, b + a[i - 1]], [])
        }

        return { labels, dataset }
    }

    useEffect(() => {
        if (data) {
            let l: string[] = [], datasets: Dataset[] = []
            Object.keys(groupBy(data, 'provider')).forEach((provider, i) => {
                const raw = data.filter(d => d.provider === provider)

                const { labels, dataset } = drawChart(raw)

                if (i === 0) l = labels
                datasets.push({
                    dataset,
                    hidden: !checkedProviders.includes(provider),
                    provider: provider as SMSProvider,
                    color: getSMSProviderColor(provider as SMSProvider, true) as number[]
                })
            })

            setLabels(l)
            setDatasets(datasets)
        }
    }, [data, chartPeriodOpt, chartFreqOpt, chartTypeOpt, txStatus, checkedProviders])

    useEffect(() => {
        if (data) setCheckedProviders(Object.keys(groupBy(data, 'provider')))
    }, [data])

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !data) return <ComponentLoader/>;

    const options: ChartOptions<'line'> = defaultLineChartOptions({
        plugins: {
            title: {
                padding: {
                    bottom: 50
                },
            },
        }
    });

    const chartData: ChartData<'line'> = {
        labels,
        datasets: datasets.map(d => ({
            label: d.provider,
            data: d.dataset,
            hidden: d.hidden,
            backgroundColor: chartGradient(d.color as number[]),
        })),
    };

    const handleCheckedProviders = (e: ChangeEvent<HTMLInputElement>) => {
        let updatedList = [...checkedProviders];

        if (e.target.checked) {
            updatedList = [...checkedProviders, e.target.value as SMSProvider];
        } else {
            updatedList.splice(checkedProviders.indexOf(e.target.value), 1);
        }

        setCheckedProviders(updatedList);
    }

    return (
        <Col xxl={6}>
            <h5 className="text-primary text-center position-relative">
                <span className="bg-200 px-3">Notification Costs</span>
                <span className="border position-absolute top-50 translate-middle-y w-100 start-0 z-index--1"/>
            </h5>

            <LineChart
                data={chartData}
                options={options}
                refetch={() => {
                    if (!bypassCache) setBypassCache(true)

                    refetch()
                }}
                isFetching={isFetching}
                txStatus={txStatus} setTxStatus={setTxStatus}
                chartTypeOpt={chartTypeOpt} setChartTypeOpt={setChartTypeOpt}
                chartPeriodOpt={chartPeriodOpt} setChartPeriodOpt={setChartPeriodOpt}
                chartFreqOpt={chartFreqOpt} setChartFreqOpt={setChartFreqOpt}
                extraModifiers={Object.keys(groupBy(data, 'provider')).sort().map((provider, i) => (
                    <Form.Check key={`provider-${i}`} className={`px-2 me-2 ms-3`} id={`provider-tx-${i}`}
                                value={provider}
                                style={{ color: String(getSMSProviderColor(provider as SMSProvider)) }}
                                type={'checkbox'} label={<b>{provider}</b>}
                                checked={checkedProviders.includes(provider)}
                                onChange={handleCheckedProviders}/>
                ))}
            />
        </Col>
    );
};

export default NotificationCosts;
