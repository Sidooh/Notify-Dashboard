import { Card, Col, Row } from 'react-bootstrap';
import CountUp from 'react-countup';
import { Badge, ComponentLoader, SectionError } from '@nabcellent/sui-react';
import { useGetDashboardSummariesQuery } from 'features/dashboard/dashboardApi';
import CardBgCorner from 'components/CardBgCorner';

const Summaries = () => {
    const {data: stats, isError, error, isLoading, isSuccess} = useGetDashboardSummariesQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !stats) return <ComponentLoader/>;

    return (
        <Row className="g-3 mb-3 h-100">
            <Col lg={6} xxl={12}>
                <Card className="h-md-100">
                    <CardBgCorner corner={3}/>
                    <Card.Body className={'position-relative d-flex flex-column justify-content-center'}>
                        <h5 className="mb-md-0 mb-lg-2">Notifications</h5>
                        <h4 className="fs-2 fw-normal text-700 m-0">
                            <CountUp end={stats.total_notifications} separator=","/>
                        </h4>
                        <div className={'position-absolute top-0 end-0 m-3'} title={'Today'}>
                            <Badge pill>
                                <CountUp end={stats.total_notifications_today} separator=","/>
                            </Badge>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={6} xxl={12}>
                <Card className="h-md-100">
                    <CardBgCorner corner={2}/>
                    <Card.Body className={'position-relative d-flex flex-column justify-content-center'}>
                        <h5 className="mb-md-0 mb-lg-2">SMS Costs</h5>
                        <h4 className="fs-2 fw-normal text-700 m-0">
                            <CountUp end={stats.sms_costs} separator="," prefix={'KES '}/>
                        </h4>
                        <div className={'position-absolute top-0 end-0 m-3'} title={'Today'}>
                            <Badge pill bg={'success'}>
                                <CountUp end={stats.sms_costs_today} separator="," prefix={'KES '}/>
                            </Badge>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Summaries;
