import { IMAGES } from '../../../constants';
import CountUp from 'react-countup';
import WeeklyNotifications from './WeeklyNotifications';
import RecentNotifications from './RecentNotifications';
import { NotificationAdd } from '@mui/icons-material';
import SmsBalances from './SmsBalances';
import { Col, Row } from 'react-bootstrap';
import { useGetDashboardQuery } from '../../../features/notifications/notificationsAPI';

const Index = () => {
    const {data} = useGetDashboardQuery();

    return (
        <>
            <Row className="g-3 mb-3">
                <Col sm={6} lg={4}>
                    <WeeklyNotifications data={data?.weekly_notifications}/>
                </Col>
                <Col sm={6} lg={4}>
                    <div className="card h-md-100">
                        <div className="bg-holder bg-card"
                             style={{backgroundImage: `url(${IMAGES.icons.spotIllustrations.corner_4})`}}/>
                        <div className="card-header pb-0">
                            <h6 className="mb-0 mt-2">Total Notifications</h6>
                        </div>
                        <div className="card-body d-flex flex-column justify-content-end">
                            <div className="row justify-content-between">
                                <div className="col-auto align-self-end">
                                    <div className="fs-4 fw-normal font-sans-serif text-700 lh-1 mb-1">
                                        <CountUp end={Number(data?.count_notifications)}/>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <NotificationAdd color={'info'} className={'fs-32'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col sm={12} lg={4}>
                    <SmsBalances credits={data?.sms_credits} default_sms_provider={data?.default_sms_provider}/>
                </Col>
            </Row>
            <Row className="g-3 mb-3">
                <Col>
                    <RecentNotifications notifications={data?.notifications}/>
                </Col>
            </Row>
        </>
    );
};

export default Index;
