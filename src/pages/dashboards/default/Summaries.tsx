import { Card, Col, Row } from 'react-bootstrap';
import CountUp from 'react-countup';
import SmsBalances from './SmsBalances';
import { Badge, ComponentLoader, SectionError } from '@nabcellent/sui-react';
import { useGetDashboardSummariesQuery } from 'features/dashboard/dashboardApi';
import CardBgCorner from 'components/CardBgCorner';

const Summaries = () => {
    const {data: stats, isError, error, isLoading, isSuccess} = useGetDashboardSummariesQuery();

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !stats) return <ComponentLoader/>;

    console.log(stats);

    return (
        <Row className="g-3 mb-3">
            <Col lg={6}>
                <Card className="h-md-100">
                    <CardBgCorner corner={2}/>
                    <Card.Body as={Row}>
                        <Col className="d-md-flex d-lg-block flex-between-center">
                            <h5 className="mb-md-0 mb-lg-2">Notifications</h5>
                            <h4 className="fs-3 fw-normal text-700">
                                <CountUp end={stats.total_notifications} separator=","/>
                            </h4>
                        </Col>
                        <Col className={'d-flex align-items-start justify-content-end'}>
                            <Badge pill>
                                <CountUp end={stats.total_notifications_today} separator=","/>
                            </Badge>
                        </Col>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={6}>
                <SmsBalances credits={stats?.sms_credits} default_sms_provider={stats?.default_sms_provider}/>
            </Col>
        </Row>
    );
};

export default Summaries;
