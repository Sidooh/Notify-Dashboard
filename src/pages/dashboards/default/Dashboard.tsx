import { lazy, Suspense } from 'react';
import { ComponentLoader } from '@nabcellent/sui-react';
import ProviderBalances from "./ProviderBalances";
import Chart from "./Chart";
import Summaries from "./Summaries";
import RecentNotifications from "./RecentNotifications";
import { Col, Row } from "react-bootstrap";

const Dashboard = () => {
    return (
        <>
            <Row className={'g-3'}>
                <Col xxl={9}>
                    <Suspense fallback={<ComponentLoader/>}><Chart/></Suspense>
                </Col>
                <Col>
                    <Suspense fallback={<ComponentLoader/>}><Summaries/></Suspense>
                </Col>
            </Row>
            <Suspense fallback={<ComponentLoader/>}><RecentNotifications/></Suspense>
            <Suspense fallback={<ComponentLoader/>}><ProviderBalances/></Suspense>
        </>
    );
};

export default Dashboard;
