import { lazy, Suspense } from 'react';
import { ComponentLoader } from '@nabcellent/sui-react';

const Chart = lazy(() => import('./Chart'));
const Summaries = lazy(() => import('./Summaries'));
const RecentNotifications = lazy(() => import('./RecentNotifications'));

const Dashboard = () => {
    return (
        <>
            <Suspense fallback={<ComponentLoader/>}><Chart/></Suspense>
            <Suspense fallback={<ComponentLoader/>}><Summaries/></Suspense>
            <Suspense fallback={<ComponentLoader/>}><RecentNotifications/></Suspense>
        </>
    );
};

export default Dashboard;
