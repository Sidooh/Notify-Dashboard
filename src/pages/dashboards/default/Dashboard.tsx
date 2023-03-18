import { lazy, Suspense } from 'react';
import { ComponentLoader } from '@nabcellent/sui-react';
import ProviderBalances from "./ProviderBalances";
import Chart from "./Chart";
import Summaries from "./Summaries";
import RecentNotifications from "./RecentNotifications";

const Dashboard = () => {
    return (
        <>
            <Suspense fallback={<ComponentLoader/>}><Chart/></Suspense>
            <Suspense fallback={<ComponentLoader/>}><Summaries/></Suspense>
            <Suspense fallback={<ComponentLoader/>}><RecentNotifications/></Suspense>
            <Suspense fallback={<ComponentLoader/>}><ProviderBalances/></Suspense>
        </>
    );
};

export default Dashboard;
