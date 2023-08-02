import { NotificationsSLOResponse, useGetNotificationsSLOQuery } from "features/analytics/analyticsApi";
import { Card, Col, Row } from "react-bootstrap";
import {
    ComponentLoader,
    getStatusColor,
    groupBy,
    LoadingButton,
    SectionError,
    Status,
    Tooltip
} from "@nabcellent/sui-react";
import CardBgCorner from "components/CardBgCorner";
import { Fragment, useState } from "react";
import CountUp from "react-countup";
import { FaPercentage, FaSync } from "react-icons/fa";

const NotificationsSLO = () => {
    const [bypassCache, setBypassCache] = useState(false)

    const { data, isError, error, isLoading, isSuccess, refetch, isFetching } = useGetNotificationsSLOQuery(bypassCache)

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !data) return <ComponentLoader/>;

    const groupedSLOs: { [key: string]: NotificationsSLOResponse[] } = groupBy(data, 'year')
    const years = Object.keys(groupedSLOs)

    return (
        <Col xs={12} className={'mb-3'}>
            <h5 className="text-primary text-center position-relative">
                    <span className="bg-200 px-3">
                        Notifications Success Rate
                        <Tooltip title="Refresh SLO" placement="start">
                            <LoadingButton loading={isFetching} className="btn btn-sm border-0 py-2"
                                           spinner-position="replace" onClick={() => {
                                if(!bypassCache) setBypassCache(true)

                                refetch()
                            }}>
                                <FaSync size={10}/>
                            </LoadingButton>
                        </Tooltip>
                    </span>
                <span
                    className="border position-absolute top-50 translate-middle-y w-100 start-0 z-index--1"></span>
            </h5>

            <Card>
                <CardBgCorner corner={5}/>
                <Card.Body className={'bg-dark'}>
                    {years.map((year, i) => {
                        const total = groupedSLOs[year].reduce((p, c) => p += Number(c.count), 0)
                        const data = groupedSLOs[year].sort((a, b) => b.count - a.count)
                            .filter(s => [Status.COMPLETED, Status.FAILED].includes(s.status))

                        return (
                            <Fragment key={`year-${year}`}>
                                <div className={'d-flex'}>
                                    <h5 className={'text-light border-bottom pe-lg-5'}>{year}</h5>
                                </div>
                                <Row className={`g-2 ${i + 1 < years.length && 'mb-5'}`}>
                                    {data.map((slo, j) => (
                                        <Col key={`slo-${year + j}`} lg={6} className={`text-center`}>
                                            <div className="py-3">
                                                <div
                                                    className={`icon-circle icon-circle-${getStatusColor(slo.status)} text-${getStatusColor(slo.status)} fw-bold`}>
                                                    <CountUp end={Math.round((Number(slo.count) / total) * 100)}
                                                             className="me-1"/>
                                                    <FaPercentage/>
                                                </div>
                                                <h6 className={`mb-1 fw-bold text-${getStatusColor(slo.status)}`}>{slo.status}</h6>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Fragment>
                        )
                    })}
                </Card.Body>
            </Card>
        </Col>
    );
};

export default NotificationsSLO;